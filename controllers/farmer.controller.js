'use strict';
var farmerModel = require('../models/farmer.model');
var farmerBillModel = require('../models/farmer_bill.model');
var breakCount = 9;

// Get Farmers
exports.getFarmers = (req, res) => {
    const limit = req.body.limit ? req.body.limit : 1000;
    const skip = req.body.skip ? (req.body.skip - 1) : 0;
    farmerModel.count().then(count => {
        var query = farmerModel.find({}).sort({'modified_at': -1}).skip(skip * limit).limit(limit);
        query.exec().then(farmerData => {
            const result = {
                'data': farmerData,
                'total': count
            };
            res.send(result);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Not able to fetch the farmers'
            })
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the farmers'
        })
    })
}

// Create New Farmer
exports.createFarmer = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'payload is required'});
        return;
    }

    req.body['created_at'] = new Date();
    req.body['modified_at'] = new Date();
    const farmer = new farmerModel(req.body);
    farmer.save(farmer)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Save operation is not occured'
        });
    })
}

// Update Farmer Info
exports.updateFarmer = (req, res) => {
    if (!req.body) {
        return res.status(400).send({message: 'Data to update can not be empty'});
    }
    const id = req.params.id;
    req.body['modified_at'] = new Date();

    farmerModel.findOneAndUpdate({'_id': id}, req.body, { returnDocument: "after" })
    .then(updatedFarmerData => {
        if (!updatedFarmerData) {
            res.status(404).send({
                message: `Cannot update farmer with id ${id}`
            });
        } else {
            res.send(updatedFarmerData);
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Update operation is not occured'
        });
    })
}

// Delete Farmer
exports.deleteFarmer = (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Farmer id param is required'});
    }
    const id = req.params.id;

    farmerModel.findOneAndRemove({'_id': id})
    .then(data => {
        if (!data) {
            res.status(404).send({
                message: `Cannot delete user with id ${id}`
            });
        } else {
            res.send({ success: true, message: "Farmer Deleted Successfully" });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'delete operation is not occured'
        });
    })   
}

// Get Farmer Bills
exports.getFarmerBills = (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({ message: 'Request payload can not be empty' });
        }
        if (req.body && (!req.body.userId && !req.body.sessionId)) {
            return res.status(400).send({message: 'userid & sessionid is required'});
        }
        if (req.body && (!req.body.bill_date)) {
            return res.status(400).send({message: 'Bill Date is required'});
        }
        if (req.body && (!req.body.farmer_id)) {
            return res.status(400).send({message: 'Farmer id is required'});
        }
        const date = req.body.bill_date;
        farmerBillModel.find({ 'date': date, 'farmer_id': req.body.farmer_id }).then(async farmerBillsData => {
            // const processedBillsData = await maxRecordsCount(farmerBillsData);
            res.send(farmerBillsData);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Not able to fetch the farmers'
            })
        })
    } catch (e) {
        console.log('get bill print catch block ', e);
        res.status(500).send({
            message: err.message || 'Not able to fetch the farmers'
        })
    }
}

function maxRecordsCount(customerData) {
    let finalArray = [];
    let filteredArray = [];
    customerData.forEach((dataObject, index) => {
      dataObject.vegetables.forEach((re, ind) => {
        re['no'] = ind + 1;
      })
      if (dataObject.vegetables.length > breakCount + 1) {
        let firstPart = dataObject.vegetables.slice(0, breakCount)
        let secondPart = dataObject.vegetables.slice(breakCount)
        let firstData = { ...dataObject }
        firstData.vegetables = firstPart;
        firstData['date'] = dataObject.date;
        firstData['farmer_name'] = dataObject.farmer_name;
        firstData['phone_number'] = dataObject.phone_number;
        firstData['balance_amount'] = dataObject.balance_amount;
        firstData['balance'] = dataObject.balance;
        let secondData = { ...dataObject }
        secondData.vegetables = secondPart;
        secondData['bill_date'] = dataObject.bill_date;
        secondData['farmer_name'] = dataObject.farmer_name;
        secondData['phone_number'] = dataObject.phone_number;
        secondData['balance_amount'] = dataObject.balance_amount;
        secondData['balance'] = dataObject.balance;
        // secondData.total_bill = returnSum(secondData.items);
        // firstData.total_bill = returnSum(firstData.items);
        firstData.bill_amount = returnSum(firstData.items);
        secondData.bill_amount = returnSum(secondData.items);
        filteredArray.push(firstData);
        filteredArray.push(secondData);
      } else {
        // let total_amount = 0;
        // dataObject.items.forEach(async obj => {
        //     total_amount = total_amount + obj.total_amount;
        // })
        filteredArray.push(dataObject)
      }
    })
    
    let hasCollectionExceedingLimit = filteredArray.some((item) => item.items.length > breakCount + 1);
    if (hasCollectionExceedingLimit) {
      return maxRecordsCount(filteredArray)
    } else {
        filteredArray.forEach((f, inde) => {
            if ((inde) === 0) {
                f['continue'] = 'Continue...';
            } else if (inde === 1) {
                f['second'] = '(ii)';
            } else if (inde === 2) {
                f['third'] = '(iii)';
            } else if (inde === 3) {
                f['end'] = 'End...';
            }
        })
        finalArray = filteredArray;
    }
    return finalArray
  }

  function returnSum(customerData) {
    return customerData.reduce((count, item) => {
      return item.total_amount + count;
    }, 0)
  }
