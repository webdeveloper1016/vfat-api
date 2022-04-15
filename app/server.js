const express = require("express");
const cors = require('cors');
// import {printAaveData} from './controller/aave';
// import router from './routes';
const router = require('./routes')


let app = express();



app.use(express.json())


app.use(cors());
app.use(router);
 




let port = 2000;

app.listen(port, () => {
    console.log(`server is listening localhost:${port}`)
})

