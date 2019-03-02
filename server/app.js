const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Listening on port ", port));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "./../dist/index.html"));
})

app.get("/main.js", (req, res) => {
    res.sendFile(path.join(__dirname + "./../dist/main.js"));
})

app.post("/budget", (req, res) => {
    // Break the request payload into variables converted into the right format.
    let start = new Date(req.body.start);
    let days = parseInt(req.body.days);

    // Format an "end" Date variable that will be the stop condition for our loop.
    // The method setDate() that we're using to compare dates, alter the variable "in place".
    // So we can't reuse the "start" variable a second time to calculate the "end" variable. 

    let end = new Date(req.body.start);
    end.setDate(end.getDate()+days);
    
    let totalCost = 0;

    let currDate = new Date(start);
    

    // Loop through the dates range (start_date + nb_days).
    while(currDate < end){
        let day = currDate.getUTCDate();
        let weekDay = currDate.getUTCDay();
        if(weekDay !== 6 && weekDay !== 0) {
            totalCost += (0.05*(Math.floor((day/7))+1));
        }
    
        currDate.setDate(currDate.getDate()+1);
        
    }

    totalCost = totalCost.toFixed(2);

    res.send({totalCost});
})