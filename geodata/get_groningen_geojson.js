const { readFileSync, writeFileSync } = require('fs');

let searchResults = JSON.parse(readFileSync('./openstreetmap-groningen-search-results.json'))

// filter out the search result that are not use full
searchResults = searchResults.filter(result =>
    result?.geojson?.coordinates
    && result?.geojson?.type === 'Polygon'
    && result.display_name.includes('Nederland')
)

// Pick the correct "Groningen from the search results"
const geoData = searchResults.reduce((acc, result) =>
    result.geojson.coordinates[0].length < acc.coordinates[0].length
        ? result.geojson
        : acc,
    searchResults[0].geojson
)

const resultJson = {
    type: 'FeatureCollection',
    totalFeatures: 1,
    features: [
        {
            type: 'Feature',
            id: 'groningen',
            properties: {
                NAME: 'groningen',
            },
            geometry: geoData,
        }
    ]
}

writeFileSync('./groningen.geojson', JSON.stringify(resultJson), { encoding: 'utf8' })
