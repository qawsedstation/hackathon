/**
 * Created by george on 09/12/2016.
 */
var request = require('request');


var options = {
    method: 'POST',
    url: 'http://gopospro.com:3030/orders/pending',
    headers: {
        'auth_email': 'qawsedstation@gmail.com',
        'auth_password' : 'qawsed'
    },

};



function callback(error, response, body) {

    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        var orderNumber = info.data.length;

        if(orderNumber) {
            for(var i = 0; i <  info.data[0].orderList.length ; i++ ){
                console.log(info.data[0].orderList[i].quantity + ' ' +info.data[0].orderList[i].product.name);
            }
        }else{
            //no orders
        }

    }
}

request(options, callback);

