const { readFileSync, writeFileSync } = require('fs')

let maxY, maxX, minY, minX
let lines = []

const drawLine = (areaSubset) =>
    lines.push(areaSubset.map(([lat, lng]) => {
        const y = lng * 100
        const x = lat * 100

        if (maxY === undefined || y > maxY) { maxY = y }
        if (minY === undefined || y < minY) { minY = y }
        if (maxX === undefined || x > maxX) { maxX = x }
        if (minX === undefined || x < minX) { minX = x }

        return { x, y }
    }))

// Get the cords
JSON.parse(readFileSync('./europe-countries.geojson')).features.map(f => {
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

JSON.parse(readFileSync('./correct-provinces-netherlands.geojson')).features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0] == 'number') {
            drawLine(area)
        } else if (typeof area[0][0][0] == 'number') {
            area.map(areaSubset => {
                drawLine(areaSubset)
            })
        } else {
            throw 'heu?'
        }
    })
})

JSON.parse(readFileSync('./groningen.geojson')).features.map(f => {
    f.geometry.coordinates.map(area => {
        if (typeof area[0][0] == 'number') {
            drawLine(area)
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

lines = lines.filter(line => {
    let areas = line.length < 40 ? blackListedAreasIfSmall : blackListedAreas
    return !line.some(({ x, y }) => y < areas.top || y > areas.bottom || x < areas.left || x > areas.right)
})

// Recalculate max, min, height and width as they are now diffrent after the lines filtering

maxY = undefined
minY = undefined
maxX = undefined
minX = undefined

lines = lines.map(line =>
    line.map(point => {
        const { x, y } = point

        if (maxY === undefined || y > maxY) { maxY = y }
        if (minY === undefined || y < minY) { minY = y }
        if (maxX === undefined || x > maxX) { maxX = x }
        if (minX === undefined || x < minX) { minX = x }

        return point
    })
)

height = maxY - minY
width = maxX - minX

// Create the svg file

const linesStrings = lines.map(line => {
    const points = line.map(({ x, y }) => `${x - minX},${height - (y - minY)}`).join(' ')
    return `<polyline points="${points}" style="fill:none;stroke:black;stroke-width:3" />`
}).join('\n')

const svgFileContent = `<svg version="1.1"
    height="${height}"
    width="${width}"
    xmlns="http://www.w3.org/2000/svg">
${linesStrings}
</svg>`

writeFileSync('./map.svg', svgFileContent, { encoding: 'utf8' })
