
const express   = require('express');
const app       = express();
const port      = 3000 ;

app.get('/', (req, res) => {
    res.json({app: 'atv'});
});

app.listen(port, (err) => {
    console.log(`Server started at port : ${port}`);
});