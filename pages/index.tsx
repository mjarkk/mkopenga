import Head from 'next/head';

export default function Home() {
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <title>Mark Kopenga</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="A website about me" />
                <meta property="og:url" content="https://mkopenga.com" />
                <meta property="og:title" content="Mark Kopenga" />
                <meta property="og:description" content="A website about me" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@900&display=swap" rel="stylesheet" />
            </Head>

            <Section
                title="Hello,"
                titleFontSizeVW={30}
                backgroundColor="rgb(224, 206, 250)"
                titleColor="rgb(91, 2, 91)"
            >
                <SectionP>I’m Mark a <s>still</s> forever learning developer who's interested in everything complex :^)</SectionP>
            </Section>

            <Section
                title="Projects"
                backgroundColor="rgb(208, 254, 230)"
                titleColor="rgb(0, 68, 33)"
            >
                <SectionP paddingTop="2vw">Here is a project i'm proud off</SectionP>
                <Project
                    link="https://github.com/mjarkk/go-graphql"
                    title="Graphql library for GoLang"
                    description="An attempt to create a GraphQL server library for Go using some different ideas than other Go GraphQL libraries"
                />
                <SectionP paddingTop="2vw">For other projects visit my github page: <a href="https://github.com/mjarkk">@mjarkk</a></SectionP>
            </Section>

            <Section
                title="Where am I?"
                backgroundColor="rgb(240, 218, 171)"
                titleColor="rgb(91, 64, 21)"
                titleFontSizeVW={17}
            >
                <SectionP>Probably somewhere in <a href="https://www.google.com/maps/place/Groningen/@53.1981098,6.3593701,9.5z/data=!4m5!3m4!1s0x47c9c27b376202ab:0xf24577154131aa51!8m2!3d53.2887213!4d6.7060867">Groningen in the Neterlands</a></SectionP>
            </Section>

            <Section
                title="Social"
                backgroundColor="rgb(255, 198, 210)"
                titleColor="rgb(113, 14, 35)"
                titleFontSizeVW={23}
            >
                <ul>
                    <li><a href="https://github.com/mjarkk">Github @mjarkk</a></li>
                    <li><a href="mailto:mkopenga@gmail.com">mkopenga@gmail.com</a></li>
                </ul>
            </Section>

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
                h1 {
                    font-family: 'Kanit', sans-serif;
                    font-wieght: 900;
                    font-size: 20vw;
                    line-height: 1;
                }
                ul {
                    font-size: min(max(1.5rem, 2.5vw), 3rem);
                }
                /*@media (prefers-color-scheme: dark) {
                    body {
                        color: white;
                        background-color: #141416;
                    }
                    a {
                        color: #3cc6e6;
                    }
                }*/
            `}</style>
        </div>
    )
};

interface SectionProps {
    children?: React.ReactNode
    title: string
    backgroundColor: string
    titleColor: string
    titleFontSizeVW?: number
}

export function Section({ titleFontSizeVW, children, title, backgroundColor, titleColor }: SectionProps) {
    return (
        <div className="section" style={{ backgroundColor: backgroundColor }}>
            <h1 style={{ color: titleColor, fontSize: `${titleFontSizeVW || 20}vw` }}>{title}</h1>
            <div className="content">{children}</div>
            <style jsx>{`
                h1 {
                    font-family: 'Kanit', sans-serif;
                    font-wieght: 900;
                    line-height: 1;
                    margin: 0 -3vw;
                }
                .section {
                    padding: 20vh 0;
                    min-height: 90vh;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    overflow: hidden;
                }
                .content {
                    padding: 0 5vw 0 10vw;
                }
            `}</style>
        </div>
    )
}

export function SectionP({ children, paddingTop }: { children: React.ReactNode, paddingTop?: string }) {
    return <p style={{ fontSize: "min(max(1.5rem, 2.5vw), 3rem)", paddingTop }}>{children}</p>
}

interface ProjectProps {
    link: string
    title: string
    description: string
}

export function Project({ link, title, description }: ProjectProps) {
    return (
        <a className="project" href={link}>
            <h3>{title}</h3>
            <p>{description}</p>
            <style jsx>{`
                .project {
                    border-left: 10px solid rgb(0, 68, 33);
                    display: block;
                    max-width: 500px;
                    text-decoration: none;
                    padding: 5px 10px 15px 10px;
                    margin-top: 10px;
                }
                .project h3 {
                    font-size: 2.4rem;
                    font-family: 'Kanit', sans-serif;
                    font-wieght: 900;
                }
                .project p {
                    font-size: 1.1rem;
                    padding-left: 15px;
                }
                .project:hover h3 {
                    text-decoration: underline;
                }
            `}</style>
        </a>
    )
}
