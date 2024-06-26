"use client";

import Categories from "./components/categories";
import Location from "./components/location";
import React, { useState, useEffect, useMemo } from "react";
import Results from "./components/results";
import { fetchDinnerPlaces } from "@/lib/dinner-places";

export default function HomePage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(false);
  const [category, setCategory] = useState(null);
  const [dinnerPlaces, setDinnerPlaces] = useState([]);

  useEffect(() => {
    if (latitude && longitude && category) {
      fetchDinnerPlaces(latitude, longitude, category).then((data) =>
        setDinnerPlaces(data)
      );
    }
  }, [latitude, longitude, category]);

  // const destructuredDinnerPlaces = useMemo(
  //   () =>
  //     dinnerPlaces.map(({ name, tel, website }) => ({
  //       name,
  //       tel,
  //       website,
  //     })),
  //   [dinnerPlaces]
  // );

  const handleLocationUpdate = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
    setLocation({ latitude, longitude });
  };

  const handleCategoryUpdate = (category) => {
    setCategory(category);
  };

  return (
    <>
      <p>
        Latitude: {latitude} Longitude: {longitude}
      </p>
      <p>Category Code: {category}</p>
      {!location && <Location onLocationUpdate={handleLocationUpdate} />}
      {location && !category && (
        <>
          <Categories onCategoryUpdate={handleCategoryUpdate} />
        </>
      )}
      {category && <Results dinnerPlaces={dinnerPlaces} />}
    </>
  );
}
