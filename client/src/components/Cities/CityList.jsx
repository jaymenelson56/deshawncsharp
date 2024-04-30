import { useEffect, useState } from "react"
import { createCity, getCities } from "../Services/Fetches"

export const CityList = () => {
    const [cities, setCities] = useState([])
    const [newCity, setNewCity] =useState({ name: ""})

    useEffect(() => {
        getCities().then((citiesArray) =>
    setCities(citiesArray))
    }, [])

    const handleAdd = () => {
        if (newCity.name){
            const addedCity = {
                name: newCity.name
            }
            createCity(addedCity)
        } else {
            window.alert("Please fill out the form")
        }
    }

    return (
        <div>
            <header>
                <div><h3>Cities</h3></div>
                <div>
                    <form>
                        <fieldset>
                            <label>City:
                                <input type="text"
                                    id="city"
                                    placeholder="Enter New City"
                                    name="city"
                                    autoComplete="off"
                                    onChange ={(event) => {
                                        const newCityCopy = {...newCity}
                                        newCityCopy.name = event.target.value
                                        setNewCity(newCityCopy)
                                    }}
                                    />
                                    <button onClick={handleAdd}>Add City</button>
                            </label>
                        </fieldset>
                    </form>
                </div>
            </header>

            <ul>
                {cities.map((city) => {
                    return (<li key={city.id}>
                        <p>{city.name}</p>
                    </li>)
                })}
            </ul>
        </div>
    )
}

//Header name Cities is centered

//List of cities displayed

//Add City input is displayed, when filled out, user clicks an add button that adds the city to the list