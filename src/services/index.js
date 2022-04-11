import DELETE from "./Delete";
import Get from "./Get";
import POST from "./Post";

//getuser
const getUser = () => Get('user/all');

//postuser
const postUser = (data) => POST('user/save',data);

//deleteuser
const deleteUser = (id) => DELETE(`user/delus/${id}`);

//edit user
const editUser = (id) => Get(`user/find?kode=${id}`);

const GENI = {
    getUser,
    postUser,
    deleteUser,
    editUser
}

export default GENI;