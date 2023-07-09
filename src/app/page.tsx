import style from './App.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className='bg-red-200'>
          <h1>Mark Kopenga</h1>
        </div>
        <div className='bg-amber-200'>
          <h2>Hi there!</h2>
          <p>I'm a software engineer interested in everything complex</p>
        </div>
        <div className='bg-fuchsia-200'>
          <h2>Contact</h2>
          <p>Email me at <a href="mailto:mkopenga@gmail.com">mkopenga@gmail.com</a></p>
          <p>Visit me somewhere in <a href="https://www.google.nl/maps/place/Groningen">Groningen</a></p>
        </div>
        <div className='bg-blue-200' />
        <div className='bg-lime-200' />
        <div className='bg-emerald-200' />
        <div className='bg-cyan-200' />
        <div className='bg-slate-200' />
      </div>
    </div>
  )
}
