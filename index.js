import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app =  express();
const port = 3000;
const apiKey = "86a25ed35ffb1ef59c5915a3";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}`;


app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/",(req,res)=>{
    res.render("index");    
})

// app.get("/sendingdata", async(req,res)=>{

// try {
//     const response = await axios.get(apiUrl);
//     const data = response.data;
//     const content = JSON.stringify(data);
// } catch (error) {
//     console.log(error);
// }
// })

app.post("/submit-form",async(req,res)=>{
    
    try {
       const from = req.body.countries1;
       const to = req.body.countries2;
       const amount = req.body.amount;

       const response = await axios.get(`${apiUrl}/pair/${from}/${to}/${amount}`);
       const data = response.data.conversion_result;
       const singleRate = response.data.conversion_rate;
       const baseCode = response.data.base_code;
       const targetCode = response.data.target_code;
       console.log(response.data);
       

       let flag1 = from.slice(0,2);
       let flag2 = to.slice(0,2);
       
       
       
    //    console.log(data);
        
       const convertedAmount = JSON.stringify(data);
    //    console.log(convertedAmount);
       
       res.render("index",{convertedAmount,flag1,flag2,singleRate,baseCode,targetCode})
       
    
        
    } catch (error) {
        console.log(error);
    }
})


app.listen(port,()=>{
    console.log(`listening from the port no ${port}`);
})