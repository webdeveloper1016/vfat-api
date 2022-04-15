// import express from 'express';
const express = require('express');
const aave = require('./aave.routes')
// import aave from './aave.routes';

const router = express.Router();

router.get('/healthcheck', (_, res) => {
    res.sendStatus(200);
});

router.use(aave);

// export default router;
module.exports = router;