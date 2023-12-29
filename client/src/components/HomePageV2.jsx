/* eslint-disable no-unused-vars */
import photo_garde from "../assets/photo_garde_2.png";
import Header from "./Header";
import SlidingAnimationHomePage from "./SlidingAnimationHomePage";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllShoes, getAllBrands, getAllCategorys, getSpecificGenders, getAllGenders } from "./Models/Models";

const HomePageV2 = () => {
  const [listShoes, setListShoes] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const [listCategorys, setListCategorys] = useState([]);
  const [listGender, setListGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoesData = await getAllShoes();
        setListShoes(shoesData);
        console.log(shoesData);
        const brandsData = await getAllBrands();
        setListBrands(brandsData);
        console.log(brandsData);
        const categorysData = await getAllCategorys();
        setListCategorys(categorysData);
        console.log(categorysData);
        const genderData = await getAllGenders();
        setListGender(genderData);
        console.log(genderData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function displayShoes() {
    return (<div className="flex flex-wrap pl-44 mt-5">
      {listShoes.map((shoes, id) => (
        <Link to={`/ProductPage/${shoes.id}`}
          className='cursor-pointer mb-8 mr-8'>
          <img
            src={shoes.imageURL}
            alt={shoes.imageURL}
            key={shoes.id}
            className="object-cover w-[15em] h-[15em]"
          />
        </Link>
      ))}
    </div>
    )
  }

  function displayGenderDropDown() {
    return (
      <select
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        value={selectedGender}
        onChange={(e) => {
          setSelectedGender(e.target.value);
          // Fetch shoes based on the selected gender
          getSpecificGenders(e.target.value).then((data) => {
            setListShoes(data);
          });
        }}
      >
        <option value="" disabled>
          Select Gender
        </option>
        {listGender.map((gender, id) => (
          <option key={id} value={gender}>
            {gender}
          </option>
        ))}
      </select>
    );
  }


  return (
    <div className="flex flex-col">
      <Header />
      {/* Utilisation de flex-col pour une disposition en colonne */}
      <img src={photo_garde} alt="photo_garde" />
      <SlidingAnimationHomePage />
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="text-4xl font-bold mb-10 my-10">Sneakers Availables Now !</div>
          <div className="mb-10">ALOO</div>
          <div className="flex flex-row justify-center items-center">
            {displayGenderDropDown()}
          </div>
          {displayShoes()}
        </div>
      </div>
    </div>
  );
};

export default HomePageV2;
