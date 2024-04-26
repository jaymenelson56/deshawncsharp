import { useEffect } from "react"
import { useState } from "react"
import { getDogs } from "../Services/Fetches"
import { Link, useNavigate } from "react-router-dom"


export const DogList = () => {
    const [dogs, setDogs] = useState([])
    const navigate = useNavigate()
    
    useEffect(() => {
        getDogs().then((dogArray) =>
    setDogs(dogArray)) 
    }, [])
    return (
        <div className="dogs">
            <header className="header"><h2>Dog List</h2>
            <div><button onClick={() => { navigate("/create") }}>Add Dog</button></div>
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
//Add Dog button below and to the right of the header that brings user to dog form

//A remove button will be next to dog list that will delete dog from api