import { useEffect } from "react"
import { useState } from "react"
import { getDogs, removeDog } from "../Services/Fetches"
import { Link, useNavigate } from "react-router-dom"


export const DogList = () => {
    const [dogs, setDogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getDogs().then((dogArray) =>
            setDogs(dogArray))
    }, [])

    const handleClick = (dogId) => {
        removeDog(dogId).then(() => { setDogs(dogs.filter(dog => dog.id !== dogId)) })
    }

    return (
        <div className="dogs">
            <header className="header"><h2>Dog List</h2>
                <div><button onClick={() => { navigate("/create") }}>Add Dog</button></div>
            </header>

            <ul className="dogs-list">
                {dogs.map((dog) => {
                    return (<li key={dog.id}>
                        <Link to={`/${dog.id}`}>{dog.name}</Link><div><button onClick={() => handleClick(dog.id)}>Remove</button></div>
                    </li>)
                })}
            </ul>
        </div>
    )
}









//A remove button will be next to dog list that will delete dog from api