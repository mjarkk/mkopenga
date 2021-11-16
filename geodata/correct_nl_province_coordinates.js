const { readFileSync } = require('fs')

const provinces = JSON.parse(readFileSync('./provinces-netherlands.json'))

let highestLat = undefined
let highestLatProvince = undefined
let lowestLat = undefined
let lowestLatProvince = undefined

let highestLng = undefined
let highestLngProvince = undefined
let lowestLng = undefined
let lowestLngProvince = undefined

provinces.features.map(province => {
    const provName = province.properties.PROV_NAAM
    let flattentList = province.geometry.coordinates.flat()
    if (typeof flattentList[0][0] != 'number') {
        flattentList = flattentList.flat()
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
})

console.log(lowestLatProvince, lowestLngProvince)
console.log(highestLatProvince, highestLngProvince)

console.log(lowestLat, lowestLng)
console.log(highestLat, highestLng)
