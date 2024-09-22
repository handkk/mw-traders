'use strict';
var userModel = require('../models/user.model');
var billPrintModel = require('../models/bill_print.model');
var breakCount = 10;

// Get Bill Prints
exports.getBillPrints = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: 'Data to update can not be empty' });
    }
    if (req.body && (!req.body.userId && !req.body.sessionId)) {
        return res.status(400).send({message: 'userid & sessionid is required'});
    }
    const userreq = {
        'userId': req.body.userId,
        'sessionId': req.body.sessionId
    }
    userModel.findOne(userreq).then(user => {
        if (user) {
            let dateQuery = {};
            if (req.body.bill_date) {
                dateQuery['bill_date'] = req.body.bill_date + 'T00:00:00.000+00:00';
            }
            console.log('\n getBillPrints dateQuery: ', dateQuery);
            var query = billPrintModel.find(dateQuery);
            query.exec().then(async billsData => {
                console.log('\n getBillPrints billsData: ', billsData);
                // billsData.map(item => item.items = maxRecordsCount(billsData))
                res.send(maxRecordsCount(billsData));
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Not able to fetch the bills'
                })
            })
        } else {
            res.status(500).send({
                success: false,
                code: 1000,
                message: 'User session ended, Please login again'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Not able to fetch the bills'
        })
    })
}

function maxRecordsCount(customerData) {
    let finalArray = [];
    let filteredArray = [];
    customerData.forEach((dataObject, index) => {
      dataObject.items.forEach((re, ind) => {
        re['no'] = ind + 1;
      })
      if (dataObject.items.length > breakCount + 1) {
        let firstPart = dataObject.items.slice(0, breakCount)
        let secondPart = dataObject.items.slice(breakCount)
        let firstData = { ...dataObject }
        firstData.items = firstPart;
        firstData['bill_date'] = dataObject.bill_date;
        firstData['name'] = dataObject.name;
        firstData['phone_number'] = dataObject.phone_number;
        let secondData = { ...dataObject }
        secondData.items = secondPart;
        secondData['bill_date'] = dataObject.bill_date;
        secondData['name'] = dataObject.name;
        secondData['phone_number'] = dataObject.phone_number;
        secondData.total_amount = returnSum(secondData.items);
        firstData.total_amount = returnSum(firstData.items);
        filteredArray.push(firstData);
        filteredArray.push(secondData);
      } else {
        dataObject['total_amount'] = returnSum(dataObject.items);
        filteredArray.push(dataObject)
      }
    })
    
    let hasCollectionExceedingLimit = filteredArray.some((item) => item.items.length > breakCount + 1);
    if (hasCollectionExceedingLimit) {
      return maxRecordsCount(filteredArray)
    } else {
        filteredArray.forEach((f, inde) => {
            if ((inde) === 0) {
                console.log('10');
                f['continue'] = 'Continue...';
            } else if (inde === 1) {
                console.log('20');
                f['second'] = '(ii)';
            } else if (inde === 2) {
                f['third'] = '(iii)';
            } else if (inde === 3) {
                f['end'] = 'End...';
            }
        })
        finalArray = filteredArray;
        console.log('this.finalArray: ', finalArray);
    }
    return finalArray
  }

  function returnSum(customerData) {
    return customerData.reduce((count, item) => {
      return item.total_amount + count;
    }, 0)
  }
