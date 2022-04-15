// import express from 'express';
const express = require('express');
// import {printAaveData} from '../controller/aave'
const printAaveData = require('../controller/aave/aave')

const router = express.Router();

router.get('/aave', printAaveData);

// export default router;
module.exports = router;