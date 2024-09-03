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

app.post("/submit-form",async(req,res)=>{
    
    try {
       const from = req.body.countries1;
       const to = req.body.countries2;
       const amount = req.body.amount;

       const response = await axios.get(`${apiUrl}/pair/${from}/${to}/${amount}`);
    //    const data = response.data.conversion_result;
    //    const singleRate = response.data.conversion_rate;
    //    const baseCode = response.data.base_code;
    //    const targetCode = response.data.target_code;
       
        // console.log(response.data);
            

       const totalData = {
        data : response.data.conversion_result,
        singleRate : response.data.conversion_rate,
        baseCode : response.data.base_code,
        targetCode : response.data.target_code,
        flag1 : from.slice(0,2),
        flag2 : to.slice(0,2),
       }

    //    console.log(totalData.singleRate);
       
       
       res.render("index",{totalData});
           
    } catch (error) {
        console.log(error);
    }
})


app.listen(port,()=>{
    console.log(`listening from the port no ${port}`);
})