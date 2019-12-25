const db = require('../config/db');


exports.addVehicleGET = (req, res) => {
    if (req.session.user) {
        return res.render('main/main');
   }
    return res.json({
        issued: "addVehicleGet request issued."
    });
};

exports.addVehiclePOST = (req, res) => {
    const vehicle = req.body;
    console.log(vehicle);

    db.MobileVehicle.findOne({
        where: {
            plate: vehicle.licensePlate
        }
    }).then(mobilVehicle => {
        if(!mobilVehicle)
            return res.json({
                cannotBeIssued: `There is no record with the licensePlateNo = ${vehicle.licensePlate} added by tow driver`
            });
        db.Vehicle.create({
            licensePlate: vehicle.licensePlate,
            chassisNo: vehicle.chassisNo,
            engineNo: vehicle.engineNo,
            trusteeNo: vehicle.trusteeNo,
            entranceDate: new Date(vehicle.entranceDate),
            stateId: vehicle.status,
            parkingLotId: mobilVehicle.parkingLot,
            mobileVehicleId: mobilVehicle.id
        }).then(newVehicle => {
            return res.json({
                Issued: `Record has been added with the licensePlateNo = ${newVehicle.licensePlate}`
            });
        }).catch(err => {
            console.log(err);
        })
    });
};

exports.searchVehicleGET = (req, res) => {
    if (req.session.user) {
        return res.render('main/main');
   }
    return res.json({
        issued: "searchVehicleGET request issued."
    });
};

exports.searchVehiclePOST = (req, res) => {
    const vehicle = req.body;
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
    }).then(a => {
        console.log('vehicle info:');
       // console.log(vehicle.dataValues);
        const vehicle = a.dataValues;
        return res.render('main/tableVehicle', {vehicle});
        res.json(vehicle);
        //res.render('main/listVehicle',{licensePlate: vehicle.licensePlate, chassisNo: vehicle.chassisNo, engineNo: vehicle.engineNo, trusteeNo: vehicle.trusteeNo});

    }).catch(err => {
        console.log(err);
    })
};