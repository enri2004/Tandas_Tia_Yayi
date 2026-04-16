import Axios from "axios";

const Apires = Axios.create({
 baseURL:"http://172.16.0.140:3000"
})

export default Apires;