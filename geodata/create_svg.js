const { readFileSync, writeFileSync } = require('fs')

let maxY, maxX, minY, minX
let lines = []

const drawLine = (areaSubset, thickness, id) =>
    lines.push({
        line: areaSubset.map(([lat, lng]) => {
            const y = lng
            const x = lat

            if (maxY === undefined || y > maxY) { maxY = y }
            if (minY === undefined || y < minY) { minY = y }
            if (maxX === undefined || x > maxX) { maxX = x }
            if (minX === undefined || x < minX) { minX = x }

            return { x, y }
        }),
        thickness,
        id,
    })

// insert the the lines of the eu countries, dutch provinces and groningen city
const countriesThickness = 20
JSON.parse(readFileSync('./europe-countries.geojson')).features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0][0] == 'number') {
            area.map(areaSubset => drawLine(areaSubset, countriesThickness, 'europe_countries'))
        } else {
            throw 'heu?'
        }
    })
})

const dutchProvincesThickness = 5
JSON.parse(readFileSync('./correct-provinces-netherlands.geojson')).features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0] == 'number') {
            drawLine(area, dutchProvincesThickness, 'dutch_provinces')
        } else if (typeof area[0][0][0] == 'number') {
            area.map(areaSubset => drawLine(areaSubset, dutchProvincesThickness, 'dutch_provinces'))
        } else {
            throw 'heu?'
        }
    })
})

const groningenThickness = 2
JSON.parse(readFileSync('./groningen.geojson')).features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0] == 'number') {
            drawLine(area, groningenThickness, 'groningen_city')
        } else {
            throw 'heu?'
        }
    })
})

// Filter out junk
// Note that the map is inverted, so top = bottom and bottom is top
// Left and right are correct tough

let height = maxY - minY
let topBlackListedOuterSize = height / 100 * 63
let bottomBlackListedOuterSize = height / 100 * 2
let width = maxX - minX
let leftBlackListedOuterSize = width / 100 * 35
let rightBlackListedOuterSize = width / 100 * 10

const blackListedAreas = {
    top: minY + topBlackListedOuterSize,
    bottom: maxY - bottomBlackListedOuterSize,
    left: minX + leftBlackListedOuterSize,
    right: maxX - rightBlackListedOuterSize,
}

topBlackListedOuterSize = height / 100 * 70
bottomBlackListedOuterSize = height / 100 * 12
leftBlackListedOuterSize = width / 100 * 50
rightBlackListedOuterSize *= 3
const blackListedAreasIfSmall = {
    top: minY + topBlackListedOuterSize,
    bottom: maxY - bottomBlackListedOuterSize,
    left: minX + leftBlackListedOuterSize,
    right: maxX - rightBlackListedOuterSize,
}

lines = lines.filter(({ line }) => {
    let areas = line.length < 40 ? blackListedAreasIfSmall : blackListedAreas
    return !line.some(({ x, y }) => y < areas.top || y > areas.bottom || x < areas.left || x > areas.right)
})

// Recalculate max, min, height and width as they are now different after the lines filtering

maxY = undefined
minY = undefined
maxX = undefined
minX = undefined

lines.map(({ line }) =>
    line.map(({ x, y }) => {
        if (maxY === undefined || y > maxY) { maxY = y }
        if (minY === undefined || y < minY) { minY = y }
        if (maxX === undefined || x > maxX) { maxX = x }
        if (minX === undefined || x < minX) { minX = x }
    })
)

height = maxY - minY
width = maxX - minX

// Create map.json

const lineGroups = lines.reduce((acc, entry) => {
    const { id, line, thickness } = entry

    const points = line.map(({ x, y }) => [x - minX, height - (y - minY)])

    if (acc[id] === undefined) { acc[id] = { lines: [points], thickness } }
    else acc[id].lines.push(points)

    return acc
}, {})

writeFileSync('./map.json', JSON.stringify({
    height,
    width,
    lineGroups,
}), { encoding: 'utf8' })

// Create the map.svg

const linesStrings = Object.entries(lineGroups).map(([id, { lines, thickness }]) => {
    const groupContent = lines.map((points) => {
        const pointsStr = points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')
        return `<polyline points="${pointsStr}" style="fill:none;stroke:black;stroke-width:${thickness}" />`
    }).join('\n')
    return `<g id="${id}">${groupContent}</g>`
}).join('\n')

const svgFileContent = `<svg version="1.1"
    height="${height * 100}"
    width="${width * 100}"
    xmlns="http://www.w3.org/2000/svg">
${linesStrings}
</svg>`

writeFileSync('./map.svg', svgFileContent, { encoding: 'utf8' })
