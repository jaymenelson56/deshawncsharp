import { useEffect, useState } from "react";
import { getCities, getWalkers } from "../Services/Fetches";
import { useNavigate } from "react-router-dom";


export const WalkerList = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState("")
    const navigate = useNavigate()

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
                        <div>{walker.name}<div><button onClick={() => {navigate(`/walkers/${walker.id}`)}}> Add Dog</button></div></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}




//If user clicks walker, they are brought to a page where they can edit walker info

//A remove Walker button next to add dog included, if clicked walker will be removed from api and any dogs previously assigned to walker will be no longer assigned to a walker