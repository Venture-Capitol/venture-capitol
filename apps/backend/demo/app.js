const { query } = require('express');
const express = require('express')
const app = express()
const port = 3000

// localhost:3000/api/user?=123434
app.get('/api/user', async function(req, res) {

    if(isNaN(parseInt(req.query.x))){
        res.json({error: "x is not a number"});
        return;
    }

    let x = parseInt(req.query.x)+12;

    res.json({ x })  
});

// localhost:3000/api/company/1234?name=leckerei&legalForm=GmbH 
app.get('/api/company/:companyId', async function(req, res) {

    if(req.query.legalForm==undefined){
        res.json({error: "missing legalForm"});
    }

    if(req.query.name==undefined){
        res.json({error: "missing name"});
    }

    res.json({ companyId: req.params.companyId, name: req.query.name, legalForm: req.query.legalForm })

});

// localhost:3000/api/company/1234
app.get('/api/company/:companyId', async function(req, res) {

    res.json({ companyId: req.params.companyId, name: "lalala", legalForm: "GmblalalH" }) 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})