import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import Home from "./Home";
import { DogDetails } from "./components/Dogs/DogDetails";
import { DogForm } from "./components/Dogs/DogForm";
import { WalkerList } from "./components/Walkers/WalkerList";
import { AddDogToWalker } from "./components/Walkers/AddDogToWalker";
import { CityList } from "./components/Cities/CityList";
import { WalkerForm } from "./components/Walkers/WalkerForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path=":dogId" element={<DogDetails />} />
        <Route path="/create" element={<DogForm />} />
      </Route>
      <Route path="/walkers" element={<App />}>
        <Route index element={<WalkerList />} />
        <Route path =":walkerId" element={<AddDogToWalker />} />
      </Route>
      <Route path = "/cities" element={<App />}>
        <Route index element={<CityList />} />
        <Route path =":walkerId" element={<WalkerForm />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
