const FBC = require('./FbcApi')
const Wikimedia = require('./WikimediaApi')
const MNW = require('./MnwApi')
Wikimedia.getArtWorks().then(artworks => {
    // console.log(artworks)
    FBC.getArtWorkDetails(artworks[0]).then(details => {
        MNW.getImageUrl(details.id).then(imgUrl => console.log(imgUrl))
    })
})