import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getSpecificShoes } from './Models/Models'
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const DisplayShoes= ({shoes}) => {
    console.log("shoes : ", shoes[0]);

    if(shoes.length === 0){ // besoind de ça sinon enfaite ça me dis que shoes existe pas !! important
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center ">
          <p className="text-2xl font-bold text-center">
            {shoes[0].brand}
          </p>
          <p className="text-4xl font-bold text-center">{shoes[0].name}</p>
          <p className="text-3xl font-bold text-center mt-3">From {shoes[0].price}€</p>
          <div className="flex items-center justify-center mt-10">
          <Link to={`/ProductPage/${shoes[0].id}`}>
            <img
              className="object-cover w-[40em] h-[40em]"
              src={shoes[0].imageURL}
              alt={shoes[0].imageURL}
              key={shoes[0].id}
            />
            </Link>
          </div>
        </div>
      );
}

const Shipping48H = () => {
    const [shoes, setShoes] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const shoesData = await getSpecificShoes(3); // modifie ici le chiffre pour choisir la promo
                setShoes(shoesData);
                console.log(shoesData)
            }
            catch (error) {
                console.error("Error fetching data:", error);
            }
        }   
        fetchData();
    }, []);

    const TextPage = () => {
        return (
            <div className="text-center mt-10 mx-auto max-w-2xl">
              <p className="text-7xl font-bold text-blue-700 mb-6">
                Exciting News!
              </p>
          
              <p className="font-bold text-5xl mb-8">
                Our
                <span className="text-red-500"> latest</span> product is ready to be
                <span className="text-red-500"> yours</span>!
              </p>
          
              <p className="text-lg leading-7 mb-8">
                We're thrilled to introduce our newest product, and to make it even better, 
                we're offering a special delivery option. 
                Place your order now, and we guarantee delivery <span className=" font-bold text-1xl text-red-500"> within 48 hours. </span>
                Don't miss out on this exclusive opportunity to receive your purchase swiftly and enjoy the benefits sooner. 
                Act fast and experience the convenience of our express delivery service! Happy shopping!
              </p>
              <p className='text-5xl font-bold '> Explore our latest and most recent collection below.</p>
              {/* You can add more styling or visual elements here as needed */}
            </div>
          );
    }

    return (
        <div>
            <Header/>
            <TextPage/>
            <div className=' flex flex-col items-center justify-center text-9xl text-red-500'>
                <FaArrowDown />
            </div>
            <DisplayShoes shoes={shoes} />
            <Footer/>
        </div>
    )
}

export default Shipping48H