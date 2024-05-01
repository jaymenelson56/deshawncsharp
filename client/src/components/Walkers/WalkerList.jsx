import { useEffect, useState } from "react";
import { deleteWalkerCities, getCities, getDogs, getWalkers, removeWalker, unassignWalkerFromDogs } from "../Services/Fetches";
import { Link, useNavigate } from "react-router-dom";


export const WalkerList = () => {
    const [walkers, setWalkers] = useState([])
    const [cities, setCities] = useState([])
    const [selected, setSelected] = useState("")
    const [dogs, setDogs] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        getWalkers().then((walkerArray) => setWalkers(walkerArray))
        getCities().then((cityArray) => setCities(cityArray))
        getDogs().then((dogArray) => setDogs(dogArray))
    }, [])

   const handleCityChange = (event) => {
        setSelected(event.target.value)
   }

   const handleClick = (walkerId) => {
    unassignWalkerFromDogs(walkerId).then(() => {
    removeWalker(walkerId).then(() => {
    deleteWalkerCities(walkerId).then(() => { 
    setWalkers(walkers.filter(walker => walker.id !== walkerId)) })})
    })
}

    return (
        <div>
            <header>
                <h2>Walker List</h2>
                <select id="citySelect" onChange={handleCityChange} value={selected}>
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
                        <p><Link to={`/cities/${walker.id}`}>{walker.name}</Link></p><div><button onClick={() => {navigate(`/walkers/${walker.id}`)}}> Add Dog</button></div>
                        <div><button onClick={() => handleClick(walker.id)}>Remove</button></div>
                    </li>
                ))}
            </ul>
        </div>
    )
}



