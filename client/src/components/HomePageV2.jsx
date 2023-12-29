/* eslint-disable no-unused-vars */
import photo_garde from "../assets/photo_garde_2.png";
import Header from "./Header";
import SlidingAnimationHomePage from "./SlidingAnimationHomePage";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getAllShoes, getAllBrands, getAllCategorys, getSpecificGenders, getAllGenders, getSpecificBrand } from "./Models/Models";
import Footer from "./Footer";

const HomePageV2 = () => {

  const [listShoes, setListShoes] = useState([]);
  const [listBrands, setListBrands] = useState([]);
  const [listCategorys, setListCategorys] = useState([]);
  const [listGender, setListGender] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [listByBrand , setListByBrand] = useState([]);
  const [notes, setNotes] = useState([]);
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
    // en gros ça permet de changer la classe si j'ai moins de 3 
    // items à afficher parce que sinon l'affiche est pas bon
    const containerClassName = listShoes.length < 3 ? "flex justify-center mt-5" : "flex flex-wrap justify-center mt-5"; 
  
    return (
      <div className={`${containerClassName}`}>
        {listShoes.map((shoes, id) => (
          <Link to={`/ProductPage/${shoes.id}`} key={shoes.id} className='cursor-pointer mb-8' style={{ marginRight: id !== listShoes.length - 1 ? '8px' : '0' }}>
            <img
              src={shoes.imageURL}
              alt={shoes.imageURL}
              className="object-cover w-[15em] h-[15em]"
            />
            <div>
              <p className="">{shoes.name}</p>
            </div>
          </Link>
        ))}
      </div>
    );
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

  function changeListWithGander(event) {
    const selectedBrand = event.target.value;
    getSpecificBrand(selectedBrand).then((data) => {
      setListShoes(data);
    });
  }

  const DisplayBrandButton = () => {
    return (
      <div>
        {listBrands.map((brand, id) => (
          <button onClick={changeListWithGander} value={brand} 
          className="mr-10 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            {brand}
          </button>
        ))}
      </div>
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
          <div className="mb-10">
            <DisplayBrandButton/>
          </div>
          <div className="flex flex-row justify-center items-center">
            {displayGenderDropDown()}
          </div>
          {displayShoes()}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default HomePageV2;
