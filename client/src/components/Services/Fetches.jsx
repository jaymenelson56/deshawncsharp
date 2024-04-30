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

export const getWalkers = () => {
    return fetch ("/api/walkers").then((res) => res.json())
}

export const getWalkerById = (id) => {
    return fetch (`/api/walkers/${id}`).then((res) => res.json())
}

export const assignDogToWalker = async (dogId, walkersId) => {
    
        return fetch(`/api/dogs/${dogId}/assign?walkerId=${walkersId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: dogId,
                walkerId: walkersId
            })
        });
};

export const createCity = (city) => {
    return fetch ("/api/cities", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },
        body:JSON.stringify(city)
    })
}