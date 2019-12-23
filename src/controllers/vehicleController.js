const db = require('../config/db');


exports.addVehicleGET = (req, res) => {
    return res.json({
        issued: "addVehicleGet request issued."
    });
};

exports.addVehiclePOST = (req, res) => {
    console.log(req.body);
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
    const vehicle = req.body;
    console.log(req.body);
    db.Vehicle.findOne({
        include: [
            { all: true, nested: true }
        ],
        where: {
            licensePlate: vehicle.licensePlate
        }
    }).then(vehicle => {
        return res.json(vehicle);
    }).catch(err => {
        console.log(err);
    })
};