"use client";

import Categories from "./components/categories";
import Loading from "./loading";
import Location from "./components/location";
import React, { useState, useEffect } from "react";
import { fetchDinnerPlaces } from "@/lib/dinner-places";
import Results from "./components/results";
import End from "./components/end";

export default function HomePage() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [category, setCategory] = useState(null);
  const [dinnerPlaces, setDinnerPlaces] = useState([]);
  const [index, setIndex] = useState(0);
  const [viewedAll, setViewedAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (latitude && longitude && category) {
      setIsLoading(true);
      fetchDinnerPlaces(latitude, longitude, category).then((data) => {
        setDinnerPlaces(data);
        setViewedAll(false);
        setIsLoading(false);
      });
    }
  }, [latitude, longitude, category]);

  const handleLocationUpdate = (latitude, longitude) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleCategoryUpdate = (category) => {
    setCategory(category);
  };

  const handleTryAgain = () => {
    if (index < dinnerPlaces.length - 1) {
      setIndex(index + 1);
    } else {
      setViewedAll(true);
    }
  };

  return (
    <>
      {!latitude && <Location onLocationUpdate={handleLocationUpdate} />}
      {latitude && !category && (
        <>
          <Categories onCategoryUpdate={handleCategoryUpdate} />
        </>
      )}
      {isLoading ? (
        <Loading />
      ) : category && (
        <div className="container">
          {dinnerPlaces.length > 0 && !viewedAll ? (
            <Results
              place={dinnerPlaces[index]}
              handleTryAgain={handleTryAgain}
            />
          ) : (
            <End />
          )}
        </div>
      )}
    </>
  );
}
