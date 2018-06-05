import axios from 'axios'

const baseURL = 'https://fbc.pionier.net.pl/index/select'
const corsURL = 'https://cors-anywhere.herokuapp.com'
export const getArtWorkDetails = async (artwork) => {
        let url = `${corsURL}/${baseURL}/?q=${artwork}&wt=json`
        let res = await axios.get(url)
        let data = res.data.response.docs[0]
       
        if(data != undefined){
                console.log(res.data)
                let details = {
                        title: data.dc_title[0],
                        creators: data.dc_creator,
                        subjects: data.dc_subject,
                        type: data.tech_type,
                        placeOfPublishing: data.plmet_placeOfPublishing,
                        date: data.dc_date ? data.dc_date[0] : null,
                        medium: data.dcterms_medium ? data.dcterms_medium[0] : null,
                        descriptions: data.dc_description
                }
                return details
        }
        return null
}