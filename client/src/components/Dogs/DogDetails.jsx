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






