const express = require('express');
const{
    getAllCountries,
    getCountryById,
    getCountryByRegion,
    getBorderName
} = require('../controllers/countryControllers')


const router = express.Router();

router.get('/', getAllCountries);

router.get('/details/:alpha3code', getCountryById)

router.get('/border/:alpha3code', getBorderName)

router.get('/region/:region', getCountryByRegion)



module.exports = router


