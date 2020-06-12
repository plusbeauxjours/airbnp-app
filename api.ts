import axios from "axios";

const callApi = async (method: string, path: string, data?: any, jwt?: string) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
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
    rooms: (page: number = 1, token: string) => callApi("get", `/rooms/?page=${page}`, null, token),
    user: (uuid: string) => callApi("get", `/users/${uuid}/`),
    favs: (uuid: string, token: string) => callApi("get", `/users/${uuid}/favs/`, null, token),
    toggleFavs: (userUuid, roomUuid, token) =>
        callApi("put", `/users/${userUuid}/favs/`, { uuid: roomUuid }, token),
}

