import Head from 'next/head';
import map from '../geodata/map.json'

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

export default function Test() {
    const { height, width, lineGroups } = map as MapT

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
                {Object.entries(lineGroups).map(([key, { thickness, lines }]) =>
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
