const slugify = str => {
    str = str.replace(/^\s+|\s+$/g, '');

    // Make the string lowercase
    str = str.toLowerCase();

    // Remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    // Remove invalid chars
    str = str.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

    return str;
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
