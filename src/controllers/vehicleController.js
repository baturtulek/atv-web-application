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
            { model: db.MobileVehicle,
                as: 'MobileVehicle' },
            { model: db.VehicleType,
                as: 'VehicleType'}
        ],
        where: {
            licensePlate: vehicle.licensePlate
        }
    }).then(vehicle => {
        
        res.json(vehicle);
        //res.render('main/listVehicle',{licensePlate: vehicle.licensePlate, chassisNo: vehicle.chassisNo, engineNo: vehicle.engineNo, trusteeNo: vehicle.trusteeNo});

    }).catch(err => {
        console.log(err);
    })
};