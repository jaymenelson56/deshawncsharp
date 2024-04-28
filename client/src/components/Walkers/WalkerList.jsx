import { useEffect, useState } from "react";
import { getCities, getWalkers } from "../Services/Fetches";


export const WalkerList = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState("")

    useEffect(() => {
        getWalkers().then((walkerArray) => setWalkers(walkerArray))
        getCities().then((cityArray) => setCities(cityArray))
    }, [])

   const handleCityChange = (event) => {
        setSelected(event.target.value)
   }

    return (
        <div>
            <header>
                <h2>Walker List</h2>
                <select onChange={handleCityChange} value={selected}>
                            <option value="" >All Cities</option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
            </header>

            <ul>
                {walkers.filter((walker) =>
                    selected === "" || walker.cities.some((city) => city.name === selected)
                ).map((walker) => (
                    <li key={walker.id}>
                        <p>{walker.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}


//Include a dropdown that allows for user to choose city and see the walkers operreating in that city

//Include an add dog button next to the walker

//if user clicks button it will take them to a page allowing them to add dogs to walkers route

//If user clicks walker, they are brought to a page where they can edit walker info

//A remove Walker button next to add dog included, if clicked walker will be removed from api and any dogs previously assigned to walker will be no longer assigned to a walker