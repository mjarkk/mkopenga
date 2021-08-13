import NextHead from 'next/head';

export default function Home() {
  return (
    <div>
      <NextHead>
        <meta charSet="UTF-8" />
        <title>Mark Kopenga</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A website about me" />
        <meta property="og:url" content="https://mkopenga.com" />
        <meta property="og:title" content="Mark Kopenga" />
        <meta property="og:description" content="A website about me" />
        <link href="https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;1,700&display=swap" rel="stylesheet"></link>
      </NextHead>

      <div className="top">
        <div className="center">
          <div className="into">
            <h1>Hey reader</h1>
            <div>
              I’m a <s>still</s> forever learning developer who is interested in complicated systems.
            </div>
          </div>
          <div className="question">
            <p className="q">Hobby project?</p>
            <div className="a">
              Currently i'm building a selfhosted cloud that i'll keep private until i have something to showoff :).
            </div>
          </div>
          <div className="question">
            <p className="q">Interests?</p>
            <div className="a">
              Mainly in computer inner workings like operating systems, compilers, databases,.. (almost everything that is complicated).
              You can also always peek my interest with things like computer components and also their inner workings, Science, Psychology and Filosophy though
              the more i start to know about these topics the more i also start know what i don't yet know.
            </div>
          </div>
          <div className="question">
            <p className="q">Where u at?</p>
            <div className="a">
              Probably somewhere <a href="https://www.google.com/maps/place/Groningen/@53.1981098,6.3593701,9.5z/data=!4m5!3m4!1s0x47c9c27b376202ab:0xf24577154131aa51!8m2!3d53.2887213!4d6.7060867">here in Groningen in the Neterlands</a>
            </div>
          </div>
          <div className="question">
            <p className="q">Links?</p>
            <div className="a">
              <ul>
                <li><a href="https://github.com/mjarkk">Github / mjarkk</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        * {
          padding: 0px;
          margin: 0px;
        }
        body {
          font-family: sans-serif;
        }
        a {
          color: rgb(72, 19, 147);
        }
        ul {
          list-style: inside;
        }
        @media (prefers-color-scheme: dark) {
          body {
            color: white;
            background-color: #202023;
          }
          a {
            color: #3cc6e6;
          }
        }
      `}</style>
      <style jsx>{`
        h1, .question .q {
          font-family: 'Tinos', serif;
          font-weight: 800;
          padding-bottom: 6px;
        }
        .top {
          display: flex;
          justify-content: center;
        }
        .center {
          padding: 100px 20px;
          max-width: 700px;
        }
        .into {
          padding-bottom: 60px;
        }
        .question {
          padding-bottom: 30px;
        }
        .into div, .question div {
          font-size: 17px;
        }
        .question .q {
          font-size: 25px;
        }
      `}</style>
    </div>
  )
};
