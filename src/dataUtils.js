import data from './data.json'
import { get } from 'https';
import { IncomingMessage } from 'http';
export const getRandomImage = () => {
    let rand = Math.floor(Math.random() * data.length)
    return data[rand]
}
export const shuffle = () => {
    let shuffled = data
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled
}
export const getPath = (img) => `./src/assets/${img}.jpg`
export const createImage = (image) => {
    let imageFile = getPath(image.img)
    return new Image(imageFile)
    
}