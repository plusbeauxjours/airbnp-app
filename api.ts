import axios from "axios";

const callApi = async (method: string, path: string, data?: any, jwt?: string) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "http://localhost:8000/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    if (method === "get" || method === "delete") {
        return axios[method](fullUrl, { headers });
    } else {
        return axios[method](fullUrl, data, { headers });
    }
};

export default {
    createAccount: (form: any) => callApi("post", "/users/", form),
    login: (form: any) => callApi("post", "/users/login/", form),
    rooms: (page: number = 1) => callApi("get", `/rooms/?page=${page}`)
}

