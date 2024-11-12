import { useEffect, useState } from "react";
import CityCard from "./CityCard";

export default function CityList({ searchTerm, searchTrigger }) {
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      loadCities(searchTerm);
    }
  }, [searchTerm, searchTrigger]);

  async function loadCities(searchTerm) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/cities/${searchTerm.toLowerCase()}`
      );
      if (!response.ok) {
        throw new Error(`Failed to load cities: ${response.statusText}`);
      }
      const citiesData = await response.json();

      const formattedCities = citiesData.map((city) => ({
        image: city.image,
        name: city.name,
        description: `${city.country} Pop:  ${city.population}`,
        coordinates: `Lat: ${city.latitude}, Lon: ${city.longitude}`,
      }));

      setFilteredCities(formattedCities);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 p-2">
      {filteredCities.map((city, index) => (
        <CityCard
          cityId={city.name}
          key={index}
          image={city.image}
          name={city.name}
          description={city.description}
          coordinates={city.coordinates}
        />
      ))}
      {filteredCities.length === 0 && (
        <p className="text-gray-500">No cities match your search.</p>
      )}
    </div>
  );
}
