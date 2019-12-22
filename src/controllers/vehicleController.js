const db = require('../config/db');


exports.addVehicleGET = (req, res) => {
    return res.json({
        issued: "addVehicleGet request issued."
    });
};

exports.addVehiclePOST = (req, res) => {
    return res.json({
        issued: "addVehiclePOST request issued."
    });
};

exports.searchVehicleGET = (req, res) => {
    return res.json({
        issued: "searchVehicleGET request issued."
    });
};

exports.searchVehiclePOST = (req, res) => {
    return res.json({
        issued: "searchVehiclePOST request issued."
    });
};