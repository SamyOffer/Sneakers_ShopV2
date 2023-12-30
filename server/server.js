// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./Models/Clients_Models");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/mangoDB_sneakers_shop_V2")
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log("Example app listening on port", PORT);
    });
  })
  .catch((err) => console.log(err));

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json("err : ", err.message);
  }
});

app.post("/getOneUserByEmail", async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log("user : ", user);
        
        if (user === null) {
            res.status(200).json(null);
        } else {
            res.status(200).json(user);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json("err : " + err.message);
    }
});


app.post("/getOneUserByID", async (req, res) => {
  const email = req.body.email;
  try {
      const user = await User.findOne({ _id: req.body.id });

      if (user === null) { 
          res.status(200).json(null);
      } else {
          // Exclure le champ du mot de passe avant de renvoyer les informations de l'utilisateur
          /*elle extrait le champ du mot de passe de l'objet utilisateur (password) et regroupe le reste des propriétés 
          dans un nouvel objet (userWithoutPassword). Cela permet de créer un nouvel objet qui représente l'utilisateur 
          sans inclure le mot de passe, et c'est cet objet qui est renvoyé en réponse JSON. */
          const { password, ...userWithoutPassword } = user.toObject();
          res.status(200).json(userWithoutPassword);
      }
  } catch (err) {
      console.log(err);
      res.status(500).json("err : " + err.message);
  }
});



app.post('/updateCart', async (req, res) => {
    try {
      const { userId, sneakerId, size, quantity } = req.body;
      console.log('size : ', size)
      console.log('quantity : ', quantity)
  
      // Trouver l'utilisateur par _id
      const user = await User.findOne({ _id: userId });
  
      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('user.Paniers : ', user.Paniers)
  
      // Convertir la taille de la requête en nombre
      const numericSize = Number(size);
  
      // Vérifier si la paire de chaussures existe déjà dans le panier et si c'est le cas, récupérer l'élément
      const existingItem = user.Paniers.find((item) => item.id === sneakerId && item.size === numericSize);
  
      if (existingItem) {
        // Mettre à jour la quantité si la paire existe déjà dans le panier
        existingItem.quantity += quantity;
      } else {
        // Ajouter une nouvelle paire de chaussures au panier
        user.Paniers.push({
          id: sneakerId,
          quantity,
          size: numericSize,
        });
      }
  
      // Enregistrer les modifications dans la base de données
      await user.save();
  
      res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
      console.error('Error during cart update:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  



app.post("/getCartFromOneUser", async (req, res) => {
  try {
        const user = await User.findOne({ _id: req.body.id });
        console.log('user : ', user )
        // Check if the user exists 
        if (user) {
            // Extract and display the Paniers field
            const paniers = user.Paniers || [];
            //printjson(paniers);
            console.log(paniers);
            res.status(200).json(paniers);
        } 
        else {
            print("User not found");
        }
      
    } 
    catch (err) {
    console.log(err);
    res.status(500).json("err : ", err.message);
  }
});

app.post("/register", async (req, res) => {
    try {
      const { email } = req.body;
  
      // Check if the user with the provided email already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(409).json({ message: "Email already exists" });
      }
  
      // If the user doesn't exist, create a new user
      const newUser = await User.create(req.body);
      
      // Respond with the newly created user
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  


app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the user with the provided email exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if the provided password matches the stored password
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // If everything is correct, respond with the user data (excluding the password)
      res.status(200).json(
        [{_id: user._id}]); // je mets dans un tableau au cas ou je veux ajouter d'autres infos
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


  app.post("/removeFromCart", async (req, res) => {
    try {
      const { userId, sneakerId, size } = req.body;
  
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove the item from the cart
      user.Paniers = user.Paniers.filter(
        (item) => !(item.id === sneakerId && item.size === size)
      );
  
      await user.save();
  
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      console.error("Error removing item from cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/updateQuantity", async (req, res) => {
    try {
      const { userId, sneakerId, size, quantity } = req.body;
  
      const user = await User.findOne({ _id: userId });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Mise à jour de la quantité pour l'élément spécifié dans le panier
      user.Paniers = user.Paniers.map((item) =>
        item.id === sneakerId && item.size === size ? { ...item, quantity } : item
      );
  
      await user.save();
  
      res.status(200).json({ message: "Quantity updated successfully" });
    } catch (error) {
      console.error("Error updating quantity:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  

  // ... (autres imports et code)

app.post("/EditMyShippingInfo", async (req, res) => {
  try {
    const { userId, address } = req.body;

    // Vérifier si l'utilisateur avec l'_id fourni existe
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Mettre à jour le champ shippingAddress avec la nouvelle adresse fournie
    user.shippingAddress = address;

    // Enregistrer les modifications dans la base de données
    await user.save();

    res.status(200).json({ message: "Shipping address updated successfully" });
  } catch (error) {
    console.error("Error updating shipping address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ... (autres routes)
