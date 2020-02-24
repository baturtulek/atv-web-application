const db = require('../config/db');


exports.addVehicleView = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            message: `You're logged in. this should show addVehicleView`
          });
   }
   return res.status(403).json({
    message: `You're not logged in. this should redirect auth view or given an appropiate error view`
  });
};

exports.addVehicle = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({
            message: `You're not logged in. this should redirect auth view or given an appropiate error view`//not logged in redirect auth
          });
   }
    const vehicle = req.body;
    console.log(vehicle);

    const towedVehicle = await db.TowedVehicle.findOne({
        where: {
            plate: vehicle.plate
        }
    });
    if(!towedVehicle) {
            const result = {
                message: `There is no record with the plate = ${vehicle.plate} added by tow driver`, 
                success: false
            };
        return res.status(401).json(result); //return no record with given plate view
        }
    try{
        const createdVehicle = await db.Vehicle.create({
            plate: vehicle.plate,
            chassisNo: vehicle.chassisNo,
            trusteeNo: vehicle.trusteeNo,
            vehicleTypeId: parseInt(vehicle.vehicleTypeId),
            engineNo: vehicle.engineNo,
            colorId: parseInt(vehicle.colorId),
            modelYear: parseInt(vehicle.modelYear),
            bodyTypeId: parseInt(vehicle.bodyTypeId),
            brandId: parseInt(vehicle.brandId),
            ownerProfileId: parseInt(vehicle.ownerProfileId)
        });
        if(createdVehicle){
            const result = {
                message: `Record has been added with the licensePlateNo = ${createdVehicle.plate}`, 
                success: true
            };
            return res.status(201).json(result);// return the appropiate view that confirms vehicle has been added
        }
    }catch(err) {
        console.log(err);
    }
};

exports.searchVehicleView = (req, res) => {
    if (req.session.user) {
        return res.status(200).json({
            message: `You're logged in. this should show searchVehicleView` // return searchVehicleView
          });
   }
   return res.status(403).json({
    message: `You're not logged in. this should redirect auth view or given an appropiate error view`//not logged in redirect auth
  });
    
};

exports.searchVehicle = async (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({
            message: `You're not logged in. this should redirect auth view or given an appropiate error view`//not logged in redirect auth
          });
   }
    const { plate } = req.body;
    try{
        const foundVehicle = await db.TowedVehicle.findOne({
            where: {
                plate: plate
            },
            include: [{
                model: db.User
            }]
        });
    
        if(!foundVehicle) {
            const result = {
                message: `There is no record with the plate = ${plate} added by tow driver`, 
                success: false
            };
        return res.status(401).json(result); //return no record with given plate view
        }
    
        return res.json(foundVehicle);
    }catch(err) {
        console.log(err);
    }
 
};