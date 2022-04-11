import axios from "axios";
import { RootPath } from "./Config";

//PUT
const PUT = (path,data) =>{
    const promise = new Promise((resolve,reject) => {
        axios.put(`${RootPath}${path}`,data).then((res)=>{
            resolve(res);
        }, (err) => {
            reject(err)
        })
    })
    return promise;
}

export default PUT;