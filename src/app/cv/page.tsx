import WorkExperiance from './work-experiance.mdx'
import Me from './me.mdx'
import Skills from './skills.mdx'

import './custom.css'

export default function Cv() {
    return <>
        <h1>Cv</h1>

        <div className='md:flex md:gap-2'>
            <div>
                <Me />
                <Skills />
            </div>
            <div>
                <WorkExperiance />
            </div>
        </div>
    </>
}