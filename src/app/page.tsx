import style from './App.module.css'

export default function Home() {
  return (
    <div className={style.container}>
      <div className={style.inner}>
        <div className='bg-red-200 dark:bg-red-800'>
          <h1 className='text-red-900 dark:text-red-100'>Mark Kopenga</h1>
        </div>
        <div className='bg-amber-200 dark:bg-amber-800'>
          <h2 className='text-amber-900 dark:text-amber-100'>Hi there!</h2>
          <p>I'm a software engineer interested in everything complex</p>
        </div>
        <div className='bg-fuchsia-200 dark:bg-fuchsia-800'>
          <h2 className='text-fuchsia-900 dark:text-fuchsia-100'>Contact</h2>
          <p>Email me at <a className='text-fuchsia-900 dark:text-fuchsia-100' href="mailto:mkopenga@gmail.com">mkopenga@gmail.com</a></p>
          <p>Visit me somewhere in <a className='text-fuchsia-900 dark:text-fuchsia-100' href="https://www.google.nl/maps/place/Groningen">Groningen</a></p>
        </div>
        <div className='bg-blue-200 dark:bg-blue-800' />
        <div className='bg-lime-200 dark:bg-lime-800' />
        <div className='bg-emerald-200 dark:bg-emerald-800' />
        <div className='bg-cyan-200 dark:bg-cyan-800' />
        <div className='bg-slate-200 dark:bg-slate-700' />
      </div>
    </div>
  )
}
