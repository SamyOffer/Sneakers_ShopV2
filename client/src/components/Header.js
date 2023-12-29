import React from "react";
import { VscAccount } from "react-icons/vsc";
import { BsBagCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { CiLogin } from "react-icons/ci";


const Header = () => {
  return (
    // Header de la page permet d'afficher le nom de la boutique, les catégories, le compte et le panier
    <div className="header black p-4 flex justify-between items-center sticky top-0 z-50 bg-white hover:bg-white">
      <div className="SneakersShop text-2xl font-bold">
        <Link to="/">SneakersShop</Link>
      </div>
      <div className="Sneakers  hover:text-gray-300">
        <Link to="/sneakersPage">Sneakers</Link>
      </div>
      <div className="shipping48h ml-4 hover:text-gray-300">
        <Link to="/shipping48h">Shipping 48h</Link>
      </div>
      {localStorage.getItem("token") === null ? (
        <div className="Compte ml-4 hover:text-gray-300">
          <Link to="/LoginPage"><CiLogin/></Link>
        </div>
      ) : (
        <div className="Compte ml-4 hover:text-gray-300">
          <Link to="/MyAccount">
            <VscAccount />
          </Link>
        </div>
      )}
      <div className="Panier ml-4 hover:text-gray-300">
        <Link to="/CartPage">
          <BsBagCheck />
        </Link>
      </div>
    </div>
  );
};

export default Header;
