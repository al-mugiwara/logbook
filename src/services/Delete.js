import axios from "axios";
import { RootPath } from "./Config";

//Delete
const DELETE = (path) => {
    const promise = new Promise((resolve, reject) => {
        axios.delete(`${RootPath}${path}`).then((res) => {
            resolve(res.data)
        }, (err) => {
            reject(err)
        })
    })
    return promise;
}

export default DELETE;