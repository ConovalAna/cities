import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function CityPage() {
  const router = useRouter();

  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cityId = router.query.cityId;

    if (cityId) {
      const fetchCityData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/weather/${cityId.toLowerCase()}`
          );

          if (!response.ok) {
            throw new Error(`Failed to load cities: ${response.statusText}`);
          }
          const citiesData = await response.json();

          setWeatherData(citiesData);
        } catch (error) {
          console.error("Error fetching city or weather data:", error);
          router.push("/404");
        } finally {
          setLoading(false);
        }
      };

      fetchCityData();
    }
  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>City or weather information is not available.</div>;
  } else
    return (
      <div className="p-8 flex flex-col items-center">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {weatherData.displayName}
            </h1>
            <p className="text-lg text-gray-600">
              {weatherData.tz_id ? `${weatherData.tz_id}, ` : ""}
              {weatherData.country}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Coordinates: Lat {weatherData.latitude}, Lon{" "}
              {weatherData.longitude}
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <Image
              src={weatherData.image}
              alt={`Image of ${weatherData.displayName}`}
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Coordinates
            </h2>
            <p className="text-gray-700 text-center">
              Latitude:{" "}
              <span className="font-medium">{weatherData.latitude}</span>,
              Longitude:{" "}
              <span className="font-medium">{weatherData.longitude}</span>
            </p>
          </div>

          <div className="bg-blue-100 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Current Weather
            </h2>
            <div className="text-center">
              <p className="text-lg text-gray-700">
                Temperature:{" "}
                <span className="font-semibold">{weatherData.temp} °C</span>
              </p>
              <p className="text-lg text-gray-700">
                Weather:{" "}
                <span className="font-semibold capitalize">
                  {weatherData.weatherDescription}
                </span>
              </p>
              <p className="text-lg text-gray-700">
                Humidity:{" "}
                <span className="font-semibold">{weatherData.humidity}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
