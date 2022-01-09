import p5 from 'p5'
import { CSSProperties, useEffect, useRef } from 'react'
import mapImport from '../geodata/map.json'
const map = mapImport as unknown as MapT

interface Group {
    thickness: number
    lines: Array<Array<[number, number]>>
}

interface MapT {
    height: number
    width: number
    maxY: number
    maxX: number
    minY: number
    minX: number
    lineGroups: { [key: string]: Group }
}

type groupOfLines = Array<Array<
    [number, number, number, number] // point: [x1, y1, x2, y2]
>>

interface mapProperties {
    drawFrom: number // 0
    drawFromComplete?: number, // The line is completely visible on screen from this point on
    resolutionSwitchAt: number // 4
    drawTilStartFadeout?: number, // The point the line will start to fade out
    drawTil: number // 20
}

type RGB = [number, number, number]

export default function Map({
    style,
    backgroundColor = [0, 0, 0],
    strokeColor = [255, 255, 255],
    scroll = false,
}: {
    style?: CSSProperties,
    backgroundColor?: RGB,
    strokeColor?: RGB
    scroll?: boolean
}) {
    const ref = useRef()

    const p5Body = (s: p5) => {
        let pointsToDraw = [] as Array<{ // groups
            properties: mapProperties
            linesHighRes: groupOfLines
            linesLowRes: groupOfLines
        }>
        let transformX = 0
        let transformY = 0

        const setPointsToDraw = () => {
            const drawFromTilMap: { [key: string]: mapProperties } = {
                europe_countries: { drawFrom: 0, resolutionSwitchAt: 4, drawTilStartFadeout: 15, drawTil: 17 },
                dutch_provinces: { drawFrom: 10, drawFromComplete: 12, resolutionSwitchAt: 25, drawTil: 100 },
                groningen_city: { drawFrom: 30, drawFromComplete: 33, resolutionSwitchAt: 50, drawTil: 100 },
            }
            const diffMap: { [key: string]: [number, number] } = { // high diff, low diff
                europe_countries: [.02, .08],
                dutch_provinces: [.01, .02],
                groningen_city: [.003, .003],
            }

            const mapToScreenRatio = s.height / map.height
            pointsToDraw = Object.entries(map.lineGroups).map(([key, group]) => {
                const maxDiff = diffMap[key]

                const [linesHighRes, linesLowRes] = maxDiff.map(maxDiff =>
                    group.lines.map(points => {
                        const res = [] as Array<[number, number, number, number]>
                        let lastUsedIdx = 0
                        for (let idx = 1; idx < points.length; idx++) {
                            const [x1, y1] = points[lastUsedIdx]
                            const [x2, y2] = points[idx]

                            const [xDiff, yDiff] = [x1 - x2, y1 - y2]
                            if (idx != points.length - 1 && ((xDiff < maxDiff && xDiff > -maxDiff) || (yDiff < maxDiff && yDiff > -maxDiff))) {
                                continue
                            }
                            lastUsedIdx = idx

                            res.push([
                                x1 * mapToScreenRatio,
                                y1 * mapToScreenRatio,
                                x2 * mapToScreenRatio,
                                y2 * mapToScreenRatio,
                            ])
                        }
                        return res
                    })
                )

                return {
                    linesHighRes,
                    linesLowRes,
                    properties: drawFromTilMap[key],
                }
            })
            transformX = 31.10 * mapToScreenRatio
            transformY = 17.95 * mapToScreenRatio
        }

        s.setup = () => {
            if (!scroll) {
                console.clear()
            }
            const attachmentEl = ref.current as HTMLElement
            s.createCanvas(attachmentEl.clientWidth, attachmentEl.clientHeight)
            if (scroll) {
                s.noLoop()
            }
            setPointsToDraw()
        }

        s.windowResized = () => {
            const attachmentEl = ref.current as HTMLElement
            s.createCanvas(attachmentEl.clientWidth, attachmentEl.clientHeight)
            setPointsToDraw()
            s.redraw()
        }

        let scrollZoomLvl = 0
        s.mouseWheel = () => {
            const attachmentEl = ref.current as HTMLElement
            const { height, top } = attachmentEl.getBoundingClientRect()
            const halfHeight = height / 2
            const windowHeight = window.innerHeight
            const halfWindowHeight = windowHeight / 2
            const screenOffsetFromMiddle = halfHeight + top - halfWindowHeight

            let offset = screenOffsetFromMiddle + halfHeight
            if (offset < 0) {
                offset = 0
            } else if (offset > height) {
                offset = height
            }

            const newScrollZoomLvl = 100 - (100 / height * offset)
            if (scrollZoomLvl == newScrollZoomLvl) {
                // Do not re-render is zoom level did not change
                return
            }
            scrollZoomLvl = newScrollZoomLvl
            s.redraw()
        }

        const maxZoomInCalc = 100 ** 2
        const calcZoom = (lvl: number) => 1 + 99 / maxZoomInCalc * (lvl ** 2)

        let zoomTimer: number = performance.now()

        s.draw = () => {
            // const startTime = performance.now()
            s.clear()
            s.background(backgroundColor[0], backgroundColor[1], backgroundColor[2])
            // s.fill(255)
            s.noFill()
            s.stroke(strokeColor[0], strokeColor[1], strokeColor[2])
            s.strokeWeight(3)

            let zoom = 1
            if (scroll) {
                zoom = calcZoom(scrollZoomLvl)
                if (zoom > 100) {
                    zoom = 100
                }
            } else {
                zoom = 1 // between 1 and 100
                const time = 20_000 // 20 seconds
                const zoomLvl = (performance.now() - zoomTimer) % time
                if (zoomLvl > (time / 2)) {
                    // Zoom out
                    zoom = calcZoom(100 / (time / 2) * (time - zoomLvl))
                } else {
                    // Zoom in
                    zoom = calcZoom(100 / (time / 2) * zoomLvl)
                }
            }

            const offsetX = (s.width / 2) - (transformX * zoom)
            const offsetY = (s.height / 2) - (transformY * zoom)

            // // Display the transform point
            // const nonZoomOffsetX = s.width / 2 - transformX
            // const nonZoomOffsetY = s.height / 2 - transformY
            // s.rect(transformX - 5 + nonZoomOffsetX, transformY - 5 + nonZoomOffsetY, 10, 10)

            for (const group of pointsToDraw) {
                const {
                    drawFrom,
                    drawFromComplete,
                    resolutionSwitchAt,
                    drawTilStartFadeout,
                    drawTil,
                } = group.properties
                if (drawFrom > zoom || drawTil < zoom) {
                    continue
                }

                let opacity = 255
                if (drawTilStartFadeout && drawTilStartFadeout < zoom) {
                    const transitionLen = drawTil - drawTilStartFadeout
                    const whereIsTransition = zoom - drawTilStartFadeout
                    opacity = 255 - (255 / transitionLen * whereIsTransition)
                } else if (drawFromComplete && drawFromComplete > zoom) {
                    const transitionLen = drawFromComplete - drawFrom
                    const whereIsTransition = zoom - drawFrom
                    opacity = 255 / transitionLen * whereIsTransition
                }
                s.stroke(strokeColor[0], strokeColor[1], strokeColor[2], opacity)

                for (const lines of zoom > resolutionSwitchAt ? group.linesHighRes : group.linesLowRes) {
                    for (const line of lines) {
                        const [x1, y1, x2, y2] = line.map((p, idx) => p * zoom + (idx % 2 === 0 ? offsetX : offsetY))

                        if (
                            (x1 < 0 && x2 < 0)
                            || (y1 < 0 && y2 < 0)
                            || (x1 > s.width && x2 > s.width)
                            || (y1 > s.height && y2 > s.height)
                        ) {
                            continue // skip as it's out of view
                        }

                        s.line(
                            x1, y1,
                            x2, y2,
                        )
                    }
                }
            }

            // const endTime = performance.now()
            // console.log(`draw took ${endTime - startTime}ms`)
        }
    }

    useEffect(() => {
        const p5Instance = new p5(p5Body, ref.current)
        return () => p5Instance.remove()
    }, [])

    return (
        <div
            ref={ref}
            style={style}
        />
    )
}
