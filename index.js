const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile('index.html');
})


app.listen(port, function() {
    console.log(`Server started at ${port}`);
})