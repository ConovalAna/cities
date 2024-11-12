export default async function cities(req, res) {
  const search = req.query.search;

  if (req.method === "GET") {
    try {
      let newUrl = new URL(`https://api.api-ninjas.com/v1/city`);

      if (search && search.trim() !== "") {
        newUrl.searchParams.append("name", search);
      }
      const request = await fetch(newUrl, {
        headers: { "X-Api-Key": "W6zkbPHjVgOI1TiFbBAj+Q==DjMF1eWpzmg7T8IY" },
      });

      const cities = await request.json();
      const citiesData = [];

      if (cities.length > 0) {
        // Loop through each city and fetch an image from Unsplash
        for (const city of cities) {
          let cityData = city;

          const unsplashKey = "esoG8J__q74cmf-tBQrcjJm5eMGuLbTOhSTryRK8j6Q";
          // Fetch city image from Unsplash
          const unsplashResponse = await fetch(
            `https://api.unsplash.com/search/photos?query=${city.name}&client_id=${unsplashKey}&per_page=1`
          );
          const unsplashData = await unsplashResponse.json();

          if (unsplashData.results && unsplashData.results.length > 0) {
            cityData.image = unsplashData.results[0].urls.regular;
          } else {
            // Fallback image if no Unsplash image is found
            cityData.image =
              "https://plus.unsplash.com/premium_photo-1672116452571-896980a801c8?fm=jpg&q=60&w=600";
          }

          // Add city data with the image to the citiesData array
          citiesData.push(cityData);
        }
      }

      res.status(200).json(citiesData);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
}

// export default async function cities(req, res) {
//   if (req.method === "GET") {
//     try {
//       const search = req.query.search;
//       const limit = 100; // Desired number of results
//       const resultsPerPage = 20; // Max results per page (Nominatim typically restricts to around 20 per request)
//       let start = 0; // Start offset for pagination
//       let cities = [];
//       let hasMoreResults = true;

//       if (!search) {
//         return res.status(400).json({ error: "City name is required" });
//       }

//       while (hasMoreResults && cities.length < limit) {
//         // Create URL for Nominatim API with pagination
//         let geoUrl = new URL("https://nominatim.openstreetmap.org/search");
//         geoUrl.searchParams.append("q", search);
//         geoUrl.searchParams.append("format", "json");
//         geoUrl.searchParams.append("addressdetails", "1");
//         geoUrl.searchParams.append("limit", resultsPerPage.toString());
//         geoUrl.searchParams.append("accept-language", "en");
//         geoUrl.searchParams.append("start", start.toString()); // Offset for pagination

//         // Make the request
//         const response = await fetch(geoUrl);

//         if (!response.ok) {
//           throw new Error(
//             `Geocoding request failed with status ${response.status}`
//           );
//         }

//         const geoData = await response.json();

//         if (geoData.length === 0) {
//           hasMoreResults = false; // No more results to fetch
//         } else {
//           // Extract and add city details to the cities array
//           geoData.forEach((cityDetails) => {
//             const cityInfo = {
//               displayName: cityDetails.display_name,
//               country: cityDetails.address.country,
//               coordinates: {
//                 lat: cityDetails.lat,
//                 lon: cityDetails.lon,
//               },
//               state: cityDetails.address.state || null,
//               county: cityDetails.address.county || null,
//             };
//             cities.push(cityInfo);
//           });

//           start += resultsPerPage; // Increase start offset for the next batch
//         }
//       }

//       // Limit the response to the desired number of cities
//       res.status(200).json(cities.slice(0, limit));
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
