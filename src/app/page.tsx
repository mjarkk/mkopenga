import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1>Hello world</h1>
        <div className="h-[2px] bg-stone-500" />
      </div>
      <div className="mb-6">
        <h2>Hi there!</h2>
        <p>I'm a software engineer by daylight and a day dreemer by night 😊</p>
      </div>
      <div className="mb-6">
        <h2>Contact</h2>
        <p>Email me at <a className='' href="mailto:mkopenga@gmail.com">mkopenga@gmail.com</a></p>
        <p>Visit me somewhere in <a className='' href="https://www.google.nl/maps/place/Groningen">Groningen</a></p>
      </div>
      <div className="mb-6">
        <h2>Blog</h2>
        <p>
          <Link href="/blog/biking-all-of-groningen">/blog/biking-all-of-groningen</Link>
        </p>
        <p>
          <Link href="/blog/favorite-media">/blog/favorite-media</Link>
        </p>
      </div>
    </div>
  )
}
