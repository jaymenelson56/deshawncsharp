//All fetch functions to api here
export const getDogs = () => {
    return fetch ("/api/dogs").then((res) => res.json())
}