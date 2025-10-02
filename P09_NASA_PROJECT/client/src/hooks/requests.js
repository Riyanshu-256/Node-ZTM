// API_URL should be defined here, for example: 'http://localhost:8000'
const API_URL = 'http://localhost:8000';

/* 
Fetch the list of planets from the API
- Sends a GET request to /planets endpoint
- Converts the response into JSON
- Returns the data to the caller
*/
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  const fetchedPlanets = await response.json();
  console.log('Fetched Planets:', fetchedPlanets);
  return fetchedPlanets;
}

/* 
Fetch the list of launches from the API
- Sends a GET request to /launches endpoint
- Converts the response into JSON
- Sorts the launches by flight number (ascending) so they appear in order
*/
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber;
  });
}

/* 
Submit a new launch to the API
- Accepts a "launch" object as input
- Sends a POST request with launch data in JSON format
- If an error occurs (like network failure), it returns { ok: false }
*/
async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${API_URL}/launches`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
    console.log('Launch Submission Response:', response);
    return response;
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

/* 
Abort (delete) a launch with a given ID
- Sends a DELETE request to /launches/:id
- If request fails (network error), logs the error and returns { ok: false }
*/
async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "delete",
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

// Exporting these functions so other files (like React components)
// can import and use them to interact with the backend API
export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};
