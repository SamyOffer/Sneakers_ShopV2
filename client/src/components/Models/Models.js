import data003 from '../../database/data003.json'

export async function getAllShoes() {
    const brandsSet = new Set();
  
    for (const shoeKey in data003) {
        const shoe = data003[shoeKey];
        brandsSet.add(shoe);
    }
    return Array.from(brandsSet);
}

export async function getAllBrands() {
    const brandsSet = new Set();
  
    for (const shoeKey in data003) {
      if (data003.hasOwnProperty(shoeKey)) {
        const shoe = data003[shoeKey];
        brandsSet.add(shoe.brand);
      }
    }
    return Array.from(brandsSet);
}
  
export async function getAllCategorys() {
    const brandsSet = new Set();
  
    for (const shoeKey in data003) {
      if (data003.hasOwnProperty(shoeKey)) {
        const shoe = data003[shoeKey];
        brandsSet.add(shoe.category);
      }
    }
    return Array.from(brandsSet);
}

export async function getAllGenders() {
  const brandsSet = new Set();

  for (const shoeKey in data003) {
    if (data003.hasOwnProperty(shoeKey)) {
      const shoe = data003[shoeKey];
      brandsSet.add(shoe.gender);
    }
  }
  return Array.from(brandsSet);
}

export async function getSpecificGenders(gender) {
  const filteredShoes = [];

  for (const shoeKey in data003) {
    if (data003.hasOwnProperty(shoeKey)) {
      const shoe = data003[shoeKey];
      if (shoe.gender === gender) {
        filteredShoes.push(shoe);
      }
    }
  }
  return filteredShoes;
}

export async function getSpecificShoes(id){
  const filteredShoes = [];
  for (const shoeKey in data003) {
      const shoe = data003[shoeKey];
      if (shoe.id === parseInt(id, 10)) {
        filteredShoes.push(shoe);
      }
  }

  return filteredShoes;
}

export async function getIsInInventory(){
  const filteredShoes = [];
  for (const shoeKey in data003) {
      const shoe = data003[shoeKey];
      if (shoe.is_in_inventory === true) {
        filteredShoes.push(shoe);
      }
  }
  return filteredShoes;
}

export async function getIsNotInInventory(){
  const filteredShoes = [];
  for (const shoeKey in data003) {
      const shoe = data003[shoeKey];
      if (shoe.is_in_inventory === false) {
        filteredShoes.push(shoe);
      }
  }
  return filteredShoes;
}

export async function getSpecificBrand(brand) {
  const filteredShoes = [];

  for (const shoeKey in data003) {
    if (data003.hasOwnProperty(shoeKey)) {
      const shoe = data003[shoeKey];
      if (shoe.brand === brand) {
        filteredShoes.push(shoe);
      }
    }
  }
  return filteredShoes;
}