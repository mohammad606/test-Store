import axios, {AxiosError} from "axios";


export const AxiosCube = async (url:string|undefined, method:string, data?:object) => {
    if(method == "GET"){
        return await axios.get(`${process.env.URL_API}/${url}.json`)
            .then(res => {
                return res.data
            })
            .catch(err => {
                console.log(err)
                return AxiosError
            })
    }else if(method == "POST"){
        return await axios.post(`${process.env.URL_API}/${url}.json`, data)
            .then(res => {

                return res.data
            })
    }

}
