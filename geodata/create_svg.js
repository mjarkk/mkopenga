const { readFileSync, writeFileSync } = require('fs')

const euCountries = JSON.parse(readFileSync('./europe-countries.geojson'))

let maxHeight, maxWidth
let lines = []

function drawLine(areaSubset) {
    const points = areaSubset.map(([lat, lng]) => {
        const x = lng * 100
        if (maxWidth == undefined || x > maxWidth) { maxWidth = x }
        const y = lat * 100
        if (maxHeight == undefined || y > maxHeight) { maxHeight = y }

        return `${y},${x}`
    }).join(' ')
    lines.push(`<polyline points="${points}" style="fill:none;stroke:black;stroke-width:3" />`)
}

euCountries.features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0][0] == 'number') {
            area.map(areaSubset => {
                drawLine(areaSubset)
            })
        } else {
            throw 'heu?'
        }
    })
})

const svgFileContent = `<svg version="1.1"
    height="${maxHeight}"
    width="${maxWidth}"
    xmlns="http://www.w3.org/2000/svg">
${lines.join('\n')}
</svg>`

writeFileSync('./map.svg', svgFileContent, { encoding: 'utf8' })

console.log(maxHeight, maxWidth)
