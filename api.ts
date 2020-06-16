import axios from "axios";

const callApi = async (method: string, path: string, data?: any, jwt?: string, params = {}) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json"
    };
    const baseUrl = "http://localhost:8000/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    if (method === "get" || method === "delete") {
        return axios[method](fullUrl, { headers, params });
    } else {
        return axios[method](fullUrl, data, { headers });
    }
};

export default {
    createAccount: (data: any) => callApi("post", "/users/", data),
    login: (data: any) => callApi("post", "/users/login/", data),
    rooms: (page: number = 1, token: string) => callApi("get", `/rooms/?page=${page}`, null, token),
    user: (uuid: string) => callApi("get", `/users/${uuid}/`),
    favs: (uuid: string, token: string) => callApi("get", `/users/${uuid}/favs/`, null, token),
    toggleFavs: (userUuid: string, roomUuid: string, token: string) =>
        callApi("put", `/users/${userUuid}/favs/`, { uuid: roomUuid }, token),
    search: (params: {}, token: string) => callApi("get", "/rooms/search/", null, token, params),
    roomReviews: (uuid: string, token: string) => callApi("get", `/rooms/${uuid}/reviews/`, null, token),
    userRooms: (uuid: string, token: string) => callApi("get", `/users/${uuid}/rooms/`, null, token),
    userReviews: (uuid: string, token: string) => callApi("get", `/users/${uuid}/reviews/`, null, token)
}

