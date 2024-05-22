const countryModels = require('../models/countryModels')
const mongoose = require('mongoose');


const getAllCountries = async (req, res) => {
    try {
        const countryModel = await countryModels.find({}, {name: 1, population: 1, region: 1, capital: 1, flag: 1, alpha3Code: 1});
        res.json(countryModel);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getCountryById = async (req, res) => {
    const { alpha3code } = req.params;

    try {
        const country = await countryModels.findOne({ alpha3Code: alpha3code }, {name: 1, nativeName: 1, topLevelDomain: 1, population: 1, region: 1, subregion: 1, currencies: 1, languages: 1, capital: 1, flag: 1, borders: 1});

        if (!country) {
            return res.status(404).json({ error: "Country not found" });
        }

        res.status(200).json(country);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const getCountryByRegion = async (req, res) => {
    const { region } = req.params;

    try {
        const regionSelect = await countryModels.find({ region: region }, {name: 1, population: 1, region: 1, capital: 1, flag: 1, alpha3Code: 1});

        if (regionSelect.length === 0) {
            return res.status(404).json({ error: "Region not found" });
        }

        res.status(200).json(regionSelect);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const getBorderName = async (req, res) => {
    const { alpha3code } = req.params;

    try {
        const country = await countryModels.findOne({ alpha3Code: alpha3code }, {name: 1, alpha3Code: 1});

        if (!country) {
            return res.status(404).json({ error: "Country not found" });
        }

        res.status(200).json(country);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


module.exports = {
    getAllCountries,
    getCountryById,
    getCountryByRegion,
    getBorderName
}

