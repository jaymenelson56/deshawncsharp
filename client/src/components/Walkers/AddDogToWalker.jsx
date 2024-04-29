import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { assignDogToWalker, getDogs, getWalkerById } from "../Services/Fetches"

export const AddDogToWalker = () => {
    const [walker, setWalker] = useState({})
    const [dogs, SetDogs] =useState([])
    const { walkerId } =useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getWalkerById(walkerId).then((theWalker) =>
        setWalker(theWalker));
        
        getDogs().then((allDogs) => {
            const walkableDogs = allDogs.filter((dog) => {
                return dog.walkerId === null 
                && walker.cities?.some(city => city.id === dog.cityId)
            }) 
            SetDogs(walkableDogs)
        })
    }, [walkerId, walker.cities])

    const handleDogAssign = (dogId) => {
        assignDogToWalker(dogId, walkerId).then(() => {
            navigate(`/${dogId}`)
        })
    }

    return (
        <div>
            <header>
                <h2>{walker.name}</h2>
            </header>
            <div>
                <h3>Available Dogs for walking</h3>
                {dogs.length === 0 ? (<p>There are no dogs avaible to walk at this time, please check again later</p>
                ) : (
                <ul>
                    {dogs.map((dog) => (
                        <li key={dog.id}>
                            <a href="#" onClick={() => handleDogAssign(dog.id)}>{dog.name}</a>
                            </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    )
}

