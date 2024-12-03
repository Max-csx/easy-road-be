const axios = require('axios');
const express = require('express');
const router = express.Router();
const API = require('../constants/api');
const { AMAP_KEY } = require('../constants/common');
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/weather', async (params, res, next) => {
    const data = await axios.get(`${API.WEATHER_API}`, {
        params: {
            key: AMAP_KEY,
            city: params.query.city,
            extensions: 'all',
            ...(params.query || {}),
        },
    });
    const json = data.data;
    res.send(json);
});

router.get('/get_adcode', async (params, res, next) => {
    const data = await axios.get(API.AD_CODE_API, {
        params: {
            key: AMAP_KEY,
            location: params.query.location,
            poitype: '190200',
            extensions: 'all',
            ...(params.query || {}),
        },
    });

    const json = data.data;
    res.send(json);
});

module.exports = router;
