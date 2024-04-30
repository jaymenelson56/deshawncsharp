import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCities, getWalkerById, updateWalkerCities } from "../Services/Fetches";

export const WalkerForm = () => {
    const [walker, setWalker] = useState({})
    const [cities, setCities] = useState([])
    const [selectedCityIds, setSelectedCityIds] = useState([])
    const [initialSelectedCityIds, setInitialSelectedCityIds] = useState([]);
    const { walkerId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getWalkerById(walkerId).then((theWalker) => {
            setWalker(theWalker)

            const initialCityIds = theWalker.cities ? theWalker.cities.map(city => city.id) : []
            setInitialSelectedCityIds(initialCityIds)

            setSelectedCityIds(initialCityIds)

            getCities().then((citiesArray) =>
                setCities(citiesArray))
        })
    }, [walkerId])

    const handleCheckbox = (cityId) => {
        setSelectedCityIds(prevIds => {
            if (prevIds.includes(cityId)) {
                return prevIds.filter(id => id !== cityId);
            } else {
                return [...prevIds, cityId]
            }
        })
    }

    const handleSubmit = () => {
        const updatedWalker = { ...walker, cities: selectedCityIds.map(id => ({ id })) }
        // Check if there are any changes made to the initial checkboxes
        const hasChanges = JSON.stringify(selectedCityIds) !== JSON.stringify(initialSelectedCityIds);

        if (!hasChanges) {
            // Display a window alert notifying the user about no changes
            window.alert("No changes were made to the initial checkboxes.");
            return; // Prevent further execution
        }

        updateWalkerCities(updatedWalker).then(() => {
            navigate(`/walkers`)
        })
    }



    return (
        <div>
            <header>
                <h2>Edit {walker.name} Cities</h2>
            </header>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>
                        <input
                            type="checkbox"
                            id={city.id}
                            value={city.id}
                            checked={selectedCityIds.includes(city.id)}
                            onChange={() => handleCheckbox(city.id)}
                        />
                        <label htmlFor={city.id}>{city.name}</label>
                    </li>
                ))}
            </ul>
            <button onClick={handleSubmit}>Update Cities</button>
        </div>
    )
}





//An update button at the bottom of the page