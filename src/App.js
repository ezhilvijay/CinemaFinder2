import { Grid, Paper, Typography } from "@mui/material";
import Layout from "./components/Layout";
import Map from "./components/Map";
import AsideIndex from "./components/AsideIndex";
import {
  FranchiseCinemasList,
  NearbyCinemasList
} from "./components/CinemaList";
import { Switch, Route } from "react-router-dom";
import Provider from "./components/Provider";
import loadable from "@loadable/component";
import React, { useState, useEffect } from "react";

// Minimal react component for page not found aside.
// Could be extracted to a different file if it was more complicated.
const NotFound = () => (
  <Typography variant="h6">404, Page Not Found!</Typography>
);

// Use @loadable/component to dynamic import the CinemaMarkers & NearbyCinemaMarkes
// this will make the application utilise code splitting to decrease the total initial code file size.
const CinemaMarkers = loadable(() => import("./components/CinemaMarkers"));
const NearbyCinemaMarkers = loadable(() =>
  import("./components/NearbyCinemaMarkers")
);
// This isn't required for the CinemasLists as they already loadable components [in ./components/CinemaList/index.jsx]

// Our root component containing our map and info panel
const App = () => { 
  const [cinemas, setCinemas] = useState([]); 

  useEffect(() => {
    // Fetch the list of cinemas here
    // Update the 'cinemas' state variable with the fetched data
    fetchCinemas()
    .then((data) => setCinemas(data))
    .catch((error) => console.log(error));
  }, []);

    // Simulated function to fetch the list of cinemas
    const fetchCinemas = () => {
      return new Promise((resolve, reject) => {
        // Simulated delay to mimic an API call
        setTimeout(() => {
          const cinemaData = [
            { id: 1, name: "Cinema 1" },
            { id: 2, name: "Cinema 2" },
            { id: 3, name: "Cinema 3" },
          ];
          resolve(cinemaData);
        }, 1000);
      });
    };

  return(
  <Provider>
    <Layout>
      <Grid item xs={12} md={8} sx={{ minHeight: 400 }}>
        <Map>
          <Switch>
            <Route exact path="/">
              <CinemaMarkers />
            </Route>
            <Route path="/nearby" component={NearbyCinemaMarkers} />
            <Route
              path="/:franchiseId/:countryCode"
              component={CinemaMarkers}
            />
          </Switch>
        </Map>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 1 }}>
          <Switch>
            <Route exact path="/" component={AsideIndex} />
            <Route path="/nearby" component={NearbyCinemasList} />
            <Route
              path="/:franchiseId/:countryCode"
              component={FranchiseCinemasList}
            />
            <Route path="*" component={NotFound} />
            <Route exact path="/">
  {cinemas.map((cinema) => (
    <CinemaMarkers key={cinema.id} cinema={cinema} />
  ))}
</Route>
          </Switch>
        </Paper>
      </Grid>
    </Layout>
  </Provider>
);
};
export default App;
