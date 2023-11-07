const {request} = require('express');
const express = require('express');
const dbconnect = require('./config');
const ModelUser = require('./userModel');
const jwt = require("jsonwebtoken")
const app = express();


const router = express.Router();


require('dotenv').config();


router.post("/", async (req,res)=>{
    const body = req.body;
    const respuesta = await ModelUser.create(body)
    res.send(respuesta)
})
 //obtener
router.get("/", async(req, res) =>{
    const respuesta = await ModelUser.find({})
    res.send(respuesta);
})

router.get("/:id", async(req, res)=>{
    const id = req.params.id;
    const respuesta = await ModelUser.findById(id)
    res.send(respuesta);
})


router.put("/:id", async(req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const respuesta = await ModelUser.findOnedAndUpdate({_id: id}, body)
    res.send(respuesta);
})





router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const usuario = await ModelUser.findOne({ _id: id });
  if (!usuario) {
    return res.status(404).send({
      error: "El usuario no existe",
    });
  }

  res.send(usuario);
});

router.post("/auth/token", async (req, res) => {
  const body = req.body;
  const usuario = await ModelUser.findOne({
    email: body.username,
    password: body.password,
  });
  if (!usuario) {
    return res.status(401).send({
      error: "Las credenciales son incorrectas",
    });
  }
  console.log(process.env.SECRET_KEY)
  const token = jwt.sign(usuario.email, process.env.SECRET_KEY, {
  });

  res.send({
    token,
  });
});

module.exports = router;












router.delete("/:id", async(req, res)=>{
    const id = req.params.id;
    const respuesta = await ModelUser.deleteOne({_id: id})
   res.send(respuesta);
})



app.use(express.json())
app.use(router);
app.listen(3001, () =>{
    console.log("Servidor iniciado en el puerto 3001");
})



dbconnect();