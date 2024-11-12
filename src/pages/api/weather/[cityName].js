export default async function cities(req, res) {
  const cityName = req.query.cityName;
  let cityData = {};

  if (req.method === "GET") {
    try {
      const cityResponse = await fetch(
        `http://localhost:3000/api/cities/${cityName.toLowerCase()}`
      );
      const cityDataArray = await cityResponse.json();

      if (cityDataArray.length > 0) {
        const city = cityDataArray[0];
        cityData = {
          displayName: city.displayName,
          country: city.country,
          state: city.state || null,
          latitude: city.latitude,
          longitude: city.longitude,
          image:
            "https://plus.unsplash.com/premium_photo-1672116452571-896980a801c8?fm=jpg&q=60&w=600",
        };

        const apiKey = "3e0e953f75824922862135527241211";
        const weatherResponse = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city.latitude},${city.longitude}`
        );
        const weatherJson = await weatherResponse.json();

        cityData.temp = weatherJson.current.temp_c;
        cityData.weatherDescription = weatherJson.current.condition.text;
        cityData.humidity = weatherJson.current.humidity;
        cityData.country = weatherJson.location.country;
        cityData.tz_id = weatherJson.location.tz_id;

        // Fetch city image from Unsplash
        const unsplashKey = "esoG8J__q74cmf-tBQrcjJm5eMGuLbTOhSTryRK8j6Q"; // Replace with your Unsplash API key
        const unsplashResponse = await fetch(
          `https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashKey}&per_page=1`
        );
        const unsplashData = await unsplashResponse.json();

        if (unsplashData.results && unsplashData.results.length > 0) {
          cityData.image = unsplashData.results[0].urls.regular;
        } else {
          // Fallback image if no Unsplash image is found
          cityData.image =
            "https://plus.unsplash.com/premium_photo-1672116452571-896980a801c8?fm=jpg&q=60&w=600";
        }

        res.status(200).json(cityData);
      }
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}
