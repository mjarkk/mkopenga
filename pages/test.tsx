import Head from 'next/head';
import map from '../geodata/map.json'

interface Line {
    id: string
    thickness: number
    line: Array<{
        x: number
        y: number
    }>
}

interface MapT {
    height: number
    width: number
    maxY: number
    maxX: number
    minY: number
    minX: number
    lineGroups: { [key: string]: Array<Line> }
}

export default function Test() {
    const { height, width, minY, minX, lineGroups } = map as MapT

    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <title>Test</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <svg
                version="1.1"
                height={height}
                width={width}
                xmlns="http://www.w3.org/2000/svg"
            >
                {Object.entries(lineGroups).map(([key, lines]) =>
                    <g key={key} id={key}>
                        {lines.map(({ line, thickness }, key) => {
                            const points = line.map(({ x, y }) => `${x - minX},${height - (y - minY)}`).join(' ')
                            return <polyline
                                key={key}
                                points={points}
                                style={{
                                    fill: 'none',
                                    stroke: 'black',
                                    strokeWidth: thickness
                                }}
                            />
                        })}
                    </g>
                )}
            </svg>


            <style jsx global>{`
                * {
                    padding: 0px;
                    margin: 0px;
                }
                body {
                    font-family: sans-serif;
                    font-size: 19px;
                    color: black;
                    background-color: white;
                    font-weight: bold;
                }
                a {
                    color: black;
                }
                ul {
                    list-style: inside;
                }
            `}</style>
        </div>
    )
};
