import p5 from 'p5'
import { useEffect, useRef } from 'react'
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

function p5Body(s: p5) {
    let pointsToDraw = [] as Array< // groups
        {
            drawFromTil: [number, number, number] // [from, resolutionSwitchPoint, til]
            linesHighRes: groupOfLines
            linesLowRes: groupOfLines
        }
    >
    let transformX = 0
    let transformY = 0

    const setPointsToDraw = () => {
        const drawFromTilMap: { [key: string]: [number, number, number] } = {
            europe_countries: [0, 4, 20],
            dutch_provinces: [10, 40, 100],
            groningen_city: [30, 50, 100],
        }
        const diffMap: { [key: string]: [number, number] } = { // high diff, low diff
            europe_countries: [.02, .08],
            dutch_provinces: [.01, .02],
            groningen_city: [.002, .004],
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
                drawFromTil: drawFromTilMap[key],
            }
        })
        transformX = 31.10 * mapToScreenRatio
        transformY = 17.95 * mapToScreenRatio
    }

    s.setup = () => {
        console.clear()
        s.createCanvas(s.windowWidth, s.windowHeight)
        // s.noLoop()
        setPointsToDraw()
    }

    s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight)
        setPointsToDraw()
        s.redraw()
    }

    const maxZoomInCalc = 100 ** 2
    const calcZoom = (lvl: number) => 1 + 99 / maxZoomInCalc * (lvl ** 2)

    let zoomTimer: number = performance.now()

    s.draw = () => {
        // const startTime = performance.now()
        s.clear()
        s.background(0)
        // s.fill(255)
        s.noFill()
        s.stroke(255)
        s.strokeWeight(3)

        const time = 20_000 // 20 seconds
        const zoomLvl = (performance.now() - zoomTimer) % time
        let zoom = 1
        if (zoomLvl > (time / 2)) {
            // Zoom out
            zoom = calcZoom(100 / (time / 2) * (time - zoomLvl))
        } else {
            // Zoom in
            zoom = calcZoom(100 / (time / 2) * zoomLvl)
        }

        const offsetX = (s.width / 2) - (transformX * zoom)
        const offsetY = (s.height / 2) - (transformY * zoom)

        // // Display the transform point
        // const nonZoomOffsetX = s.width / 2 - transformX
        // const nonZoomOffsetY = s.height / 2 - transformY
        // s.rect(transformX - 5 + nonZoomOffsetX, transformY - 5 + nonZoomOffsetY, 10, 10)

        for (const group of pointsToDraw) {
            const [drawFrom, resolutionSwitch, drawTil] = group.drawFromTil
            if (drawFrom > zoom || drawTil < zoom) {
                continue
            }

            for (const lines of zoom > resolutionSwitch ? group.linesHighRes : group.linesLowRes) {
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

export default function Map() {
    const ref = useRef()

    useEffect(() => {
        const p5Instance = new p5(p5Body, ref.current)
        return () => p5Instance.remove()
    }, [])

    return (
        <div
            ref={ref}
            style={{
                height: '100vh',
                width: '100vw',
                overflow: 'hidden',
            }}
        />
    )
}
