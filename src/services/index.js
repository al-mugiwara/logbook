import DELETE from "./Delete";
import Get from "./Get";
import POST from "./Post";
import PUT from "./Put";

//getuser
const getUser = () => Get('user/all');

//postuser
const postUser = (data) => POST('user/save',data);

//deleteuser
const deleteUser = (id) => DELETE(`user/delus/${id}`);

//edit user
const editUser = (id) => Get(`user/find?kode=${id}`);

//put user
const updateUser = (data,id) => PUT(`user/edituser/${id}`,data);

//POST LOG BOOK
const postLog = (data) => POST('Logbook/save',data);

//get Log Book Belum Dikerjakan
const getLogblm = () => Get('Logbook/log');

//update status Log Book
const updatestaLog = (data,id) => PUT(`Logbook/update/${id}/${data}`,data);

const GENI = {
    getUser,
    postUser,
    deleteUser,
    editUser,
    updateUser,
    postLog,
    getLogblm,
    updatestaLog
}

export default GENI;