import { useEffect } from "react"
import { useState } from "react"
import { getDogs } from "../Services/Fetches"
import { Link } from "react-router-dom"


export const DogList = () => {
    const [dogs, setDogs] = useState([])
    
    useEffect(() => {
        getDogs().then((dogArray) =>
    setDogs(dogArray)) 
    }, [])
    return (
        <div className="dogs">
            <header className="header"><h2>Dog List</h2>
            </header>

            <ul className="dogs-list">
                {dogs.map((dog) => {
                    return (<li key={dog.id}>
                        <Link to={`/${dog.id}`}>{dog.name}</Link>
                    </li>)
                })}
            </ul>
        </div>
    )
}


//List of dogs is The Header and it is centered Centered 

//List of the dogs from the API using a fetch function

//Clicking the dog brings them to page detailing the dogs

//A remove button will be next to dog list that will delete dog from api