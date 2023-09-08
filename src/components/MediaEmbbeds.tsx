import Image from "next/image"

export interface MediaTagProps {
    href?: string
    youtubeAt?: string
    title: string
    description?: string
    logoSrc: string
    lang?: string
}

export function MediaTag({ href, youtubeAt, title, description, logoSrc, lang }: MediaTagProps) {
    if (youtubeAt) {
        href = `https://www.youtube.com/${youtubeAt}/videos`
    }

    return <div className="pb-8 pr-4 flex items-start gap-6 no-underline max-w-[900px]">
        <div className="min-w-[80px] max-w-[80px]">
            <a href={href}> <Image
                alt='channel logo'
                height={80}
                width={80}
                className="rounded-full mt-1"
                src={logoSrc}
            /></a>
            {lang ? <div className="flex justify-center">
                <div className="mt-2 inline-block text-sm bg-stone-700 px-[10px] py-[3px] rounded-full">
                    {lang}
                </div>
            </div> : undefined}
        </div>
        <div>
            <a href={href} className="inline-block transition-colors bg-stone-900 hover:bg-stone-700 decoration-stone-500">
                <h3>{title}</h3>
            </a>
            {description ?
                <p className="italic">"{description}"</p>
                :
                <p className="italic text-stone-500">No channel description</p>
            }
        </div>
    </div>
}
