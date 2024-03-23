import Showall from "./Pages/Showall.jsx";
import Home from "./Pages/Home.jsx";
import Placedetails from "./Pages/Placedetails.jsx";

import About from "./components/About/About.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

import AdminNavbar from "./components/adminNavbar/AdminNavbar.jsx";
import ListMonuments from "./components/ListMonuments/ListMonuments.jsx";
import AddMonument from "./components/AddMonument";
import EditMonument from "./components/EditMonument";
import Gallery from "./components/gallery";
import AddGallery from "./components/addGallery";
import EditGallery from "./components/EditGallery";
import Login from "./components/login";
import Register from "./components/register";

import "./App.css";
import React from "react";
import axios from "axios";
import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  const token = localStorage.getItem("token");
  if (token) axios.defaults.headers.common["Authorization"] = token;


  return (
    <>
      {token  ? <AdminNavbar /> : <Navbar />}
      
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/manage/ListMonuments" element={<ListMonuments />} />
        <Route path="/manage/monument/create" element={<AddMonument />} />
        <Route path="/manage/monument/edit/:id" element={<EditMonument />} />
        <Route path="/manage/gallery/:id" element={<Gallery />} />
        <Route path="/manage/gallery/create/:id" element={<AddGallery />} />
        <Route path="/manage/gallery/edit/:id" element={<EditGallery />} />

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Showall />} />
        <Route path="/places/:placeId" element={<Placedetails />} />
      </Routes>
      
      <Footer/>
    </>
  );
}

export default App;
