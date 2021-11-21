import Head from 'next/head';
import Dynamic from 'next/dynamic'

const Map = Dynamic(() => import('../components/map'))

export default function Test() {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <title>Test</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Map />

            <style jsx global>{`
                    * {
                    padding: 0px;
                    margin: 0px;
                }
                body {
                    font - family: sans - serif;
                    font - size: 19px;
                    color: black;
                    background - color: white;
                    font - weight: bold;
                }
                a {
                    color: black;
                }
                ul {
                    list - style: inside;
                }
                `}</style>
        </div>
    )
};
