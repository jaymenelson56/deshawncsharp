import { useEffect, useState } from "react"
import { createDog, getCities } from "../Services/Fetches"
import { useNavigate } from "react-router-dom"

export const DogForm = () => {
    const [newDog, setNewDog] = useState({ name: "", cityId: 0 })
    const [cities, setCities] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getCities().then((citiesArray) =>
            setCities(citiesArray))
    }, [])

    const handleSave = (event) => {
        event.preventDefault()  
        if (newDog.name && newDog.cityId){
            const puppy = {
            name: newDog.name,
            cityId: newDog.cityId
            }
            createDog(puppy).then(() => {
                navigate(`/`)
            })
        } else {
            window.alert("Please fill out the form")
        }
    }

    const handleCityChange = (event) => {
        setNewDog({ ...newDog, cityId: event.target.value})
    }

    return (
        <form>
            <fieldset>
                <div>
                    <label>Name:
                        <input type="text"
                            id="name"
                            placeholder="Enter Name of Dog"
                            name="name"
                            autoComplete="off"
                            onChange ={(event) => {
                                const newDogCopy = { ...newDog}
                                newDogCopy.name = event.target.value
                                setNewDog(newDogCopy)
                            }}
                        />
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label>City:
                        <select value={newDog.cityId} name="city" id="city" onChange={handleCityChange}>
                            <option value="" hidden>Select City...</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </fieldset>
            <button onClick={handleSave}>Submit</button>
        </form>
    )
}
