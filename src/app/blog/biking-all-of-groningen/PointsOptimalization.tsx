'use client'

// @refresh reset

import anime from 'animejs/lib/anime.es.js';
import { useEffect } from 'react';

export function PointsOptimalization() {
    const backgrouncColor = '#d6d3d1'
    const positive = '#166534' // tailwind green-700
    const negative = '#b91c1c' // tailwind red-700
    useEffect(() => {
        const outlineSize = 120
        const hiddenOpacity = .2

        const tl = anime.timeline({
            duration: 1500,
            easing: 'easeOutExpo',
            loop: true,
            autoplay: true
        })
            .add({
                targets: '.points-optimalization-v1 .dot',
                opacity: 1,
            })
            .add({
                targets: '.points-optimalization-v1 .dot',
                opacity: hiddenOpacity,
            })
            // Show the first dot
            .add({
                targets: '.points-optimalization-v1 .dot-1',
                opacity: 1,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-1',
                'outline-width': outlineSize,
            }, '-=1500')
            // Show the second dot
            .add({
                targets: '.points-optimalization-v1 .dot-2',
                opacity: 1,
            })
            // Highlight the second dot to indicate it's allowed
            .add({
                targets: '.points-optimalization-v1 .dot-2',
                'background-color': positive,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-2',
                'background-color': backgrouncColor,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-2',
                'outline-width': outlineSize,
            }, '-=1500')
            // How the third dot
            .add({
                targets: '.points-optimalization-v1 .dot-3',
                opacity: 1,
            })
            // Highlight the third dot to indicate it's NOT allowed
            .add({
                targets: '.points-optimalization-v1 .dot-3',
                'background-color': negative,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-3',
                opacity: hiddenOpacity,
            })
            // Show the fourth dot
            .add({
                targets: '.points-optimalization-v1 .dot-4',
                opacity: 1,
            })
            // Highlight the fourth dot to indicate it's allowed
            .add({
                targets: '.points-optimalization-v1 .dot-4',
                'background-color': positive,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-4',
                'background-color': backgrouncColor,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-4',
                'outline-width': outlineSize,
            }, '-=1500')
            // Show the fifth dot
            .add({
                targets: '.points-optimalization-v1 .dot-5',
                opacity: 1,
            })
            // Highlight the fifth dot to indicate it's NOT allowed
            .add({
                targets: '.points-optimalization-v1 .dot-5',
                'background-color': negative,
            })
            .add({
                targets: '.points-optimalization-v1 .dot-5',
                opacity: hiddenOpacity,
            })
            .add({
                targets: '.points-optimalization-v1 .dot',
                opacity: hiddenOpacity,
                'outline-width': 0,
                'background-color': backgrouncColor,
            })

        return () => tl.pause()
    }, [])

    const dots: Record<number, [number, number, React.CSSProperties | undefined]> = {
        1: [40, 40, {}],
        2: [200, 200, {}],
        3: [90, 170, {}],
        4: [260, 10, {}],
        5: [180, 80, { opacity: 1 }],
    }

    return (
        <>
            <p className='text-stone-400'>Filtering out dots</p>
            <div className='rounded-lg points-optimalization-v1 overflow-hidden h-[300px] w-[300px]'>
                {Object.entries(dots).map(([key, [x, y, style]], i) =>
                    <Dot
                        key={key}
                        nr={key}
                        style={{
                            opacity: 0,
                            outline: '0px solid ' + positive,
                            backgroundColor: backgrouncColor,
                            boxSizing: 'border-box',
                            border: '2px solid ' + backgrouncColor,
                            top: -i * 40 + y,
                            left: + x,
                            ...style,
                        }}
                    />
                )}
            </div>
        </>
    )
}

function Dot({ nr, style }: { nr: number | string, style?: React.CSSProperties }) {
    return (
        <div style={style} className={`dot dot-${nr} h-[40px] w-[40px] relative rounded-full`} />
    )
}
