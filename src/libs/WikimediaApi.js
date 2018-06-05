import axios from 'axios'

const baseURL = 'https://commons.wikimedia.org/w/api.php'

export const getArtWorks = async () => {
        let res = await axios.get(baseURL, {
                    params: {
                        action: 'query',
                        list: 'categorymembers',
                        cmlimit: 100,
                        cmtitle: 'Category:Media_contributed_by_the_National_Museum_in_Warsaw',
                        format: 'json',
                        origin: '*'
                     },
                     headers: {
                         'Content-Type': 'application/json; charset=UTF-8'
                     }
                })
        let artWorks = res.data.query.categorymembers.filter(value => {
            return (!value.title.toLowerCase().includes('malowidł') && value.title.startsWith('File:'))
        }).map(value => value.title.replace('File:', ''))
        return artWorks
}
export const getArtWorkImageUrl = async artWork => {
    let res = await axios.get(baseURL, {
        params: {
            action: 'query',
            prop: 'imageinfo',
            iiprop: 'url',
            titles: `File:${artWork}`,
            format: 'json',
            origin: '*'
         },
         headers: {
             'Content-Type': 'application/json; charset=UTF-8'
         }
    })
    console.log(res)
    let pages = res.data.query.pages
    let imgUrl = pages[Object.keys(pages)[0]]
    console.log(imgUrl)
    return imgUrl.imageinfo[0].url
}