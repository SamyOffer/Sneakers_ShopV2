import React, { useState, useEffect } from 'react';
import Header from './Header';
import { getAllShoes, getIsInInventory, getIsNotInInventory } from './Models/Models';
import { Link } from "react-router-dom";
import Footer from "./Footer";

const SneakersPage = () => {

  const [listShoes, setListShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [filterOption, setFilterOption] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoesData = await getAllShoes();
        setListShoes(shoesData);
        setFilteredShoes(shoesData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = async (filterType) => {
    let filteredData;
    switch (filterType) {
      case 'ALL':
        filteredData = listShoes;
        break;
      case 'INVENTORY':
        filteredData = await getIsInInventory();
        break;
      case 'NOT_INVENTORY':
        filteredData = await getIsNotInInventory();
        break;
      default:
        filteredData = listShoes;
        break;
    }
    setFilterOption(filterType);
    setFilteredShoes(filteredData);
  }

  function displayShoes() {
    return (
      <div className="flex flex-wrap ml-44 mt-5">
        {filteredShoes.map((shoes, id) => (
          <Link to={`/ProductPage/${shoes.id}`} key={shoes.id} className='cursor-pointer mb-8 mr-8'>
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

  const DisplayFilterButtons = () => {
    return (
      <div className="my-4 ml-10">
        <button
          onClick={() => handleFilterChange('ALL')}
          className={`mr-2 px-4 py-2 ${filterOption === 'ALL' ? 'bg-gray-300' : 'bg-gray-100'} text-gray-800 rounded`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange('INVENTORY')}
          className={`mr-2 px-4 py-2 ${filterOption === 'INVENTORY' ? 'bg-gray-300' : 'bg-gray-100'} text-gray-800 rounded`}
        >
          In Stock
        </button>
        <button
          onClick={() => handleFilterChange('NOT_INVENTORY')}
          className={`px-4 py-2 ${filterOption === 'NOT_INVENTORY' ? 'bg-gray-300' : 'bg-gray-100'} text-gray-800 rounded`}
        >
          Not in Stock
        </button>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <DisplayFilterButtons />
      {displayShoes()}
      <Footer/>
    </div>
  );
};

export default SneakersPage;
