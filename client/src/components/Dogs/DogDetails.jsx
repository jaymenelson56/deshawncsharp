import { useEffect, useState } from "react"
import { getDogById } from "../Services/Fetches"
import { useParams } from "react-router-dom"

export const DogDetails = () => {
    const [dog, setDog] = useState({})
    const { dogId } = useParams()

    useEffect(() => {
        getDogById(dogId).then((theDog) =>
    setDog(theDog))
    }, [])
    return (
        <div>
            <header>
                <h2>{dog.name}</h2>
            </header>
            <p>{dog.name} lives in {dog.city?.name} and {dog.walker ? `is being walked by ${dog.walker.name}.` : "is available to walk."}</p> 
        </div>
    )
}
//Dog Name as header

//Dog lives in this city

//If dog is assigned a walker then display dog is being walked by this walker, else dog isn't currently assigned to walker

//Add Dog button below and to the right of the header that brings user to dog form