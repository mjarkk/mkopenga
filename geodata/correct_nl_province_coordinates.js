const { readFileSync, writeFileSync } = require('fs')

const provinces = JSON.parse(readFileSync('./provinces-netherlands.json'))

let highestLat = undefined
let highestLatProvince = undefined
let lowestLat = undefined
let lowestLatProvince = undefined

let highestLng = undefined
let highestLngProvince = undefined
let lowestLng = undefined
let lowestLngProvince = undefined

provinces.features = provinces.features.map(province => {
    const provName = province.properties.PROV_NAAM

    const formatMethod = ([lat, lng]) => {
        return [
            lat * .0000145 + 3.16, // change width and move to right
            lng * .00000895 + 48.005, // change height and move to top
        ]
    }

    let flattentList = province.geometry.coordinates.flat()
    if (typeof flattentList[0][0] == 'number') {
        province.geometry.coordinates = province.geometry.coordinates.map(l1 => l1.map(formatMethod))
    } else {
        flattentList = flattentList.flat()
        province.geometry.coordinates = province.geometry.coordinates.map(l1 => l1.map(l2 => l2.map(formatMethod)))
    }

    flattentList.map(coordinate => {
        const [lat, lng] = coordinate

        if (!highestLat || lat > highestLat) {
            highestLat = lat
            highestLatProvince = provName
        }
        if (!lowestLat || lat < lowestLat) {
            lowestLat = lat
            lowestLatProvince = provName
        }

        if (!highestLng || lng > highestLng) {
            highestLng = lng
            highestLngProvince = provName
        }
        if (!lowestLng || lng < lowestLng) {
            lowestLng = lng
            lowestLngProvince = provName
        }
    })

    return province
})


provinces.features.map(province => {
    const first = province.geometry.coordinates[0][0]
    const res = (typeof first[0] == 'number') ? first : first[0];
    console.log(province.properties.PROV_NAAM, res)
})
console.log()

console.log('lat', lowestLat, lowestLatProvince)
console.log('lng', lowestLng, lowestLngProvince)
console.log('lat', highestLat, highestLatProvince)
console.log('lng', highestLng, highestLngProvince)

writeFileSync('./correct-provinces-netherlands.geojson', JSON.stringify(provinces), { encoding: 'utf8' })
