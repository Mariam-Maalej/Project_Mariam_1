const express = require("express");
const app = express();
const connect = require("./config/connect");
const path = require('path')

//database connection
connect();
app.use(express.json());

// Define Routes
app.use("/camp", require("./routes/hike"));
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/authUser"));

//Serve static assets in production
if (process.env.NODE_ENV==='production'){
  app.use(express.static('client/build'))
  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//Port
const port = process.env.PORT || 5000;
app.listen(port, (error) => {
  error
    ? console.log("Connection failed")
    : console.log(`Server in running on port ${port}`);
});
