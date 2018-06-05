// import axios from 'axios'
// import convert from 'xml-js'

// const baseURL = 'http://cyfrowe.mnw.art.pl/Content'
// const corsURL = 'https://cors-anywhere.herokuapp.com'
// export const getArtWorkImageUrl = async (id) => {
//     let url = `${corsURL}/${baseURL}/${id}/PresentationData.xml`
//     let res = await axios.get(url, {
//         headers: {
//             'X-Requested-With': 'http://localhost:1234'
//         }
//     })
//     let data = JSON.parse(convert.xml2json(res.data, {compact: true, spaces: 4}))
//     let presentationElement = data['object-presentation']['presentation-elements']['presentation-element']
//     if(Array.isArray(presentationElement)){
//         presentationElement = presentationElement[0]
//     }
//     let imgName = presentationElement['full-image']['_cdata'].trim()
//     let imgUrl = `${url}/${imgName}`
//     return imgUrl
// }