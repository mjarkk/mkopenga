const slugify = str => {
    // Trim spaces and make the string lowercase
    str = str.replace(/^\s+|\s+$/g, '').toLowerCase();

    // Remove accents, swap ñ for n, etc
    const from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    const to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (let i = 0, l = from.length; i < l; i++) {
        const replace = from.charAt(i)
        const replaceWith = to.charAt(i)
        str = str.replace(new RegExp(replace, 'g'), replaceWith);
    }

    return str.replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
        .replace(/\s+/g, '-') // Collapse whitespace and replace by -
        .replace(/-+/g, '-') // Collapse dashes
}

const europeCountries = [
    `Albania`,
    `Andorra`,
    `Austria`,
    `Belarus`,
    `Belgium`,
    `Bosnia and Herzegovina`,
    `Bulgaria`,
    `Croatia`,
    `Cyprus`,
    `Czechia`,
    `Czech Republic`,
    `Denmark`,
    `Estonia`,
    `Finland`,
    `France`,
    `Germany`,
    `Greece`,
    `Hungary`,
    `Iceland`,
    `Ireland`,
    `Italy`,
    `Kosovo`,
    `Latvia`,
    `Liechtenstein`,
    `Lithuania`,
    `Luxembourg`,
    `Malta`,
    `Moldova`,
    `Monaco`,
    `Montenegro`,
    `Netherlands`,
    `North Macedonia`,
    `Macedonia`,
    `Norway`,
    `Poland`,
    `Portugal`,
    `Romania`,
    `San Marino`,
    `Serbia`,
    `Republic of Serbia`,
    `Slovakia`,
    `Slovenia`,
    `Spain`,
    `Sweden`,
    `Switzerland`,
    `Ukraine`,
    `Vatican City`,
].map(country => slugify(country));

const { readFileSync, writeFileSync } = require('fs');

let countriesJson = JSON.parse(readFileSync('countries.geojson'))
countriesJson.features = countriesJson.features.filter(
    country => europeCountries.includes(slugify(country?.properties?.ADMIN || ''))
)

console.log(europeCountries.length, countriesJson.features.length)

writeFileSync('europe-countries.geojson', JSON.stringify(countriesJson), { encoding: 'utf8' })
