import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faSearch,
  faXmark,
  faUser,
  faYinYang,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/images/brand-logo.png";
import "../../assets/styles/navbar.css";

const menuItems = [
  { text: "Home", to: "/", icon: faHome },
  { text: "About", to: "/about", icon: faYinYang },
  { text: "Login", to: "/login", icon: faUser },
];

const handleMenu = () => {
  const navDialog = document.getElementById("nav-dialog");
  navDialog.classList.toggle("hidden");
};

const Navbar = ({ setProps }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setProps(inputValue);
  };

  const enterPressed = (e) => {
    if (e.key === "Enter") {
      setProps(inputValue);
      
      setInputValue("");
    }
  };

  const navLinks = menuItems.map((item, index) => {
    return (
      <div className="flex justify-between items-center" key={index}>
        <Link to={item.to} className="font-medium hover:text-white">
          <FontAwesomeIcon icon={item.icon} className="text-base size-4 px-2" />
          {item.text}
        </Link>
      </div>
    );
  });

  return (
    <nav className="p-3 flex justify-between items-center bg-primary-nav text-gray-300 sticky top-0 z-50">
      <a href="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="md:size-20 xs:size-16" />
      </a>
      <div id="nav-menu" className="hidden md:flex gap-4">
        {navLinks}
      </div>
      <div className="hidden md:flex items-center border border-grey-500 rounded-lg p-1">
        <FontAwesomeIcon icon={faSearch} className=" m-2" />
        <input
          type="text"
          placeholder="Search songs..."
          className="outline-none flex-grow bg-primary-nav"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={enterPressed}
        />
        <button
          className="ml-2 bg-blue-700 text-white rounded-md px-3 py-1"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      <button onClick={handleMenu} className="md:hidden">
        <FontAwesomeIcon icon={faBars} className="text-2xl" id="menu-bar" />
      </button>

      <div
        id="nav-dialog"
        className="hidden fixed inset-0 bg-primary-nav text-gray-300 p-3"
      >
        <div id="nav-bar" className="flex justify-between">
          <a href="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="md:size-20 xs:size-16" />
            <span className="text-2xl font-medium italic" id="brand-name">
              MusiX
            </span>
          </a>
          <button onClick={handleMenu} className="md:hidden">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-3xl"
              id="menu-bar"
            />
          </button>
        </div>
        <div className="flex flex-col justify-between gap-4 my-10">
          {navLinks}
        </div>
        <div className="flex flex-col items-center  ">
          <div className="flex items-center gap-1 w-full rounded-md p-1 border border-blue-700">
            <div className="w-10 flex items-center justify-center ">
              <FontAwesomeIcon icon={faSearch} className=" p-2 " />
            </div>
            <div className="w-90 border-l-2 px-2 border-gray-300">
              <input
                type="text"
                placeholder="Search songs..."
                className="outline-none bg-primary-nav w-full"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button
            className=" bg-blue-700 font-bold rounded-md px-3 py-1 mt-2 w-full"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
