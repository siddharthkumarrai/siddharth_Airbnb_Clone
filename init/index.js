const mongoose = require("mongoose");
const initData = require("./data.js")
const Listing = require("../models/listing.js");

main()
.then(()=>{
  console.log("connected to DB")
}).catch((error)=>{
    console.log(error)
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:'65bb9a9b85509d50b33c2233'}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
};

initDB();