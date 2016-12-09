'use strict';
var alexaSDK = require('alexa-sdk');
var request = require('request');

const
    REPROMPT = 'For assistance just say \'Help Me\'.',
    SKILL = 'gif gaff from DAG team'; // for pronunciation

exports.handler = function(event, context){
    var alexa = alexaSDK.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to ' + SKILL + '. How can I help?', REPROMPT);
    },
    'CurrentOrderIntent': function () {


        var that = this;

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
                    var orders = '';

                    for(var i = 0; i <  info.data[0].orderList.length ; i++ ){
                        orders =  orders.concat(info.data[0].orderList[i].quantity + ' ' +info.data[0].orderList[i].product.name+ ', ')
                    }

                    that.emit(':tell', 'The current order is '+ orders);
                }else{
                    that.emit(':tell', 'There are no pending orders for the kitchen. well done. You are so fast.');
                }

            }
        }

        request(options, callback);





    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '<p>Here are some things you can say:</p><p>Make me a giff gaffer</p><p>Order giff gaff sim card?</p><p>What bundles are available?</p><p>So how can I help?</p>', REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye.');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Yikes! Something went wrong.');
    }
};

