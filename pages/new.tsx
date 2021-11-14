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

            <div className="section into">
                <h1>Hello,</h1>
                <p>I’m Mark a <s>still</s> forever learning developer who's interested in everything complex :^)</p>
            </div>

            <div className="section projects">
                <h1>Projects</h1>
                <p>Here is a project i'm proud off</p>
                <div className="projectsList">
                    <a href="https://github.com/mjarkk/go-graphql">
                        <h3>Graphql library for GoLang</h3>
                        <p>An attempt to create a GraphQL server library for Go using some different ideas than other Go GraphQL libraries</p>
                    </a>
                </div>
                <p>For other projects visit my github page: <a href="https://github.com/mjarkk">@mjarkk</a></p>
            </div>

            <div className="section whereUAt">
                <h1>Where am I?</h1>
                <p>Probably somewhere <a href="https://www.google.com/maps/place/Groningen/@53.1981098,6.3593701,9.5z/data=!4m5!3m4!1s0x47c9c27b376202ab:0xf24577154131aa51!8m2!3d53.2887213!4d6.7060867">here in Groningen in the Neterlands</a></p>
            </div>

            <div className="section social">
                <h1>Social</h1>
                <ul>
                    <li><a href="https://github.com/mjarkk">Github / mjarkk</a></li>
                    <li><a href="mailto:mkopenga@gmail.com">mkopenga@gmail.com</a></li>
                </ul>
            </div>

            <style jsx>{`
                h1 {
                    font-family: 'Kanit', sans-serif;
                    font-wieght: 900;
                    font-size: 20vw;
                    line-height: 1;
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
                .section > h1 {
                    margin: 0 -3vw;
                }
                .section > p {
                    padding: 0 5vw 0 10vw;
                    font-size: min(max(1.5rem, 2.5vw), 3rem);
                }
                .into {
                    background-color: rgb(224, 206, 250);
                }
                .into h1 {
                    color: rgb(91, 2, 91);
                    font-size: 30vw;
                }
                .projects {
                    background-color: rgb(208, 254, 230);
                }
                .projects h1 {
                    color: rgb(0, 68, 33);
                }
                .projects > p {
                    padding-top: 2vw;
                }
                .projectsList {
                    padding: 0 5vw 0 10vw;
                }
                .projectsList a {
                    border-left: 10px solid rgb(0, 68, 33);
                    color: black;
                    display: block;
                    max-width: 500px;
                    text-decoration: none;
                    padding: 5px 10px 15px 10px;
                    margin-top: 10px;
                }
                .projectsList h3 {
                    font-size: 2.4rem;
                    font-family: 'Kanit', sans-serif;
                    font-wieght: 900;
                }
                .projectsList p {
                    font-size: 1.1rem;
                    padding-left: 15px;
                }
                .projectsList a:hover h3 {
                    text-decoration: underline;
                }
                .whereUAt {
                    background-color: rgb(240, 218, 171);
                }
                .whereUAt h1 {
                    color: rgb(91, 64, 21);
                    font-size: 17vw;
                }
                .social {
                    background-color: rgb(255, 198, 210);
                }
                .social h1 {
                    color: rgb(113, 14, 35);
                    font-size: 23vw;
                }
                .social ul {
                    padding: 0 5vw 0 10vw;
                    font-size: min(max(1.5rem, 2.5vw), 3rem);
                }
            `}</style>
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
                    color: rgb(72, 19, 147);
                }
                ul {
                    list-style: inside;
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
