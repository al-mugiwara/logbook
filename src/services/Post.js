import axios from "axios";
import { RootPath } from "./Config";

//POST
const POST = (path,data) => {
    const promise = new Promise((resolve,reject) => {
        axios.post(`${RootPath}${path}`,data).then((res) => {       
            resolve(res);
        },(err) => {
            reject(err);
        })
    })

    return promise;
}

export default POST;