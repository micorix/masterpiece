const fs = require('fs')
const sharp = require('sharp')
const axios = require('axios')

Number.prototype.pad = function(n){
    return new Array(n).join('0').slice((n || 2) * -1) + this;
}

const getData = () => new Promise(resolve => axios.get('http://files.mnw.art.pl/hackathon/data.json').then(res => resolve(res.data)))
const getIDfromUri = (uri) => uri.replace('http://files.mnw.art.pl/hackathon/img/','').replace('.jpg', '')

const downloadImage = ({imageData, width, dirPath}) => new Promise((resolve, reject) => {
    let imageUri = imageData.img
    let id = getIDfromUri(imageUri)
    let resizer = sharp().resize(width, null).max()
   
    var outPath = `${dirPath}/${id}.jpg`;
      console.log('WRITING', outPath);
      axios.get(imageUri, {
          responseType: 'stream'
      }).then(res => {
        let downloadStream = res.data
        var writeStream = fs.createWriteStream(outPath);
        downloadStream.pipe(resizer).pipe(writeStream);
        downloadStream.on('end', () => resolve(outPath));
        writeStream.on('error', reject);
        resizer.on('error', reject);
      })
    
  
  })

const resizeImage = ({imageData, width, dirPath}) => new Promise((resolve, reject) => {
    let imageUri = imageData.img
    let id = getIDfromUri(imageUri)
    let resizer = sharp().resize(width, null).max()
    // axios.get(imageUri).then(res => {
    //     if(res.data.startsWith('<!DOCTYPE html>')){
    //         resolve()
    //     }else{
            let writeStream = fs.createWriteStream(`${dirPath}/${id}.jpg`)
            axios.get(imageUri, {
                responseType: 'stream'
            }).then(res => {
                res.data.pipe(resizer).pipe(writeStream)
                resolve(imageData)
            })
            
            
        // }
    // })
  })
const rename = (filtered) => {
    filtered.forEach((el, i) => {
        let oldPath = getIDfromUri(el.img)
        el.img = i.pad(3)
        fs.rename(oldPath, el.img, err => {
            if(err)
            console.log(err)
        })
    })
    return filtered
}
const init = async () => {
    let data = await getData()
    const width = 300
    const dirPath = './src/assets'
    const dataPath = './src/data.json'
    let promises = [ ]
//     console.log(data)
// resizeImage({imageData: data[3], width, dirPath}).then(data => console.log(data))
// resizeImage({imageUri: data[3].img, width, id: getIDfromUri(data[3].img), dirPath})
data.forEach((el, i) => {
   let imageUri = el.img
   let id = getIDfromUri(imageUri)
   el.img = id
//    console.log(id)
//    promises.push(downloadImage({imageData:el, width, dirPath}))
})
// Promise.all(promises)
// .then((data) => {
//     let filtered = data.filter(value => value != undefined)
//     let pure = rename(filtered)
    fs.writeFile(dataPath, JSON.stringify(data), err => {
        if(err)
        console.log(err)
    })

// })
}
init()

// (() => {
//     getData().then(data => console.log(data))
// // let data = await getData()
// // const width = 300
// // const dirPath = './src/assets'
// // const dataPath = './src'
// // let promises = [
// //     resizeImage({imageData: data[0], width, dirPath}),
// //     resizeImage({imageData: data[3], width, dirPath})
// // ]
// // console.log(data)
// // resizeImage({imageData: data[3], width, dirPath}).then(data => console.log(data))
// // resizeImage({imageUri: data[3].img, width, id: getIDfromUri(data[3].img), dirPath})
// // data.forEach((el, i) => {
// //    let imageUri = el.img
// //    let id = getIDfromUri(imageUri)
// //    console.log(id)
// // //    promises.push(resizeImage({imageUri, width, id, dirPath}))
// // })
// // Promise.all(promises).then((data) => console.log(data))
// // cleanUp({data, dirPath, dataPath})
// })()

