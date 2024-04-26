//All fetch functions to api here
export const getDogs = () => {
    return fetch ("/api/dogs").then((res) => res.json())
}

export const getDogById = (id) => {
    return fetch (`/api/dogs/${id}`).then((res) => res.json())
}

export const getCities = () => {
    return fetch ("/api/cities").then((res) => res.json())
}

export const createDog = (dog) => {
    return fetch ("/api/dogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body:JSON.stringify(dog)
    })
}