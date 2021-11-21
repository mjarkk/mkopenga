import map from '../geodata/map.json'
import { useEffect } from 'react'

interface Group {
    thickness: number
    lines: Array<string>
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

export default function Map() {
    const { height, width, lineGroups } = map as MapT

    const configMap: { [key: string]: { thickness: number } } = {
        europe_countries: { thickness: 20 },
        dutch_provinces: { thickness: 4 },
        groningen_city: { thickness: 1 },
    }

    useEffect(() => {
        const now = new Date()
        const startT = now.getTime()
        now.setSeconds(now.getSeconds() + 5)
        const endT = now.getTime()
        const diffT = endT - startT
        const svgEl = document.querySelector('svg')

        let doThing;
        doThing = () => requestAnimationFrame(() => {
            const t = (new Date()).getTime()
            if (t < endT) {
                const newScale = (1 - .006) / diffT * (t - startT) + .006
                console.log(newScale)
                // svgEl.style.transform = `scale(${newScale}, ${newScale})`
                doThing?.()
            } else {
                console.log(1)
                // svgEl.style.transform = 'scale(1, 1)'
            }
        })
        doThing()
        return () => doThing = undefined
    }, [])

    return (
        <div className="svgContainer">
            <svg
                style={{
                    transform: `scale(.006, .006)`,
                }}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={`0 0 ${width} ${height} `}
            >
                {Object.entries(lineGroups).map(([key, { lines }]) => {
                    const { thickness } = configMap[key]
                    return (
                        <g key={key} id={key}>
                            {lines.map((line, key) => {
                                return <polyline
                                    key={key}
                                    points={line}
                                    style={{
                                        fill: 'none',
                                        stroke: 'black',
                                        strokeWidth: thickness
                                    }}
                                />
                            })}
                        </g>
                    )
                })}
            </svg>

            <style jsx>{`
                .svgContainer {
                    position: fixed;
                    width: 20000vw;
                    top: 50%;
                    left: 50%;
                    transform: translate(-48.08%, -46.58%);
                }
                svg {
                    width: 100%;
                    transform-origin: 48.1% 46.6%;
                    transition: transform 0.1s;
                    /*
                        animation-name: example;
                        animation-duration: 3s;
                        animation-iteration-count: infinite;
                        animation-timing-function: cubic-bezier(.3,0,1,.9);
                    */
                }
                @keyframes example {
                    from {
                        transform: scale(.006, .006);
                    }
                    to {
                        transform: scale(1, 1);
                    }
                }
            `}</style>
        </div>

    )
};
