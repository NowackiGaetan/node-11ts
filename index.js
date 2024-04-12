const express = require('express')
const mysql = require("mysql")
const app = express()
const port = 3000
const cors = require("cors")

app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
  res.send("Bonjour!")
})

const users = require("./routes/users")
app.use("/users",users)

const commandesExpediees = require("./routes/commandesExpedieesRoute")
app.use("/commandes-expediees",commandesExpediees)

const commandesReceptionees = require("./routes/commandeReceptionneesRoute")
app.use("/commandes-receptionnees",commandesReceptionees)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


