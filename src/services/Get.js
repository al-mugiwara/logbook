import axios from "axios";
import {RootPath} from './Config';

const Get = (path)  => {
    const promise = new Promise((resolve,reject) => {
        axios.get(`${RootPath}${path}`)
        .then((res) => {
            resolve(res.data);
            //sudah diambil dalam bentuk data json
        }, (err) => {
            reject(err);
        })
    })

    return promise;
}

export default Get;