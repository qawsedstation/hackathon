'use strict';
var alexaSDK = require('alexa-sdk');
var request = require('request');
var converter = require('number-to-words');

const
    REPROMPT = 'For assistance just say \'Help Me\'.';


exports.handler = function (event, context) {
    var alexa = alexaSDK.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};


var handlers = {
    'LaunchRequest': function () {
        this.emit(':ask', 'Welcome to the kitchen. How can I help?', REPROMPT);
    },
    'CurrentOrderIntent': function () {


        var that = this;

        var options = {
            method: 'POST',
            url: 'http://212.47.243.101:3030/orders/pending',
            headers: {
                'auth_email': 'email@gmail.com',
                'auth_password': 'password'
            },

        };

        function callback(error, response, body) {

            if (!error && response.statusCode == 200) {
                var orders = JSON.parse(body).data;
                var ordersCount = orders.length;
                var message = '';
                if (ordersCount > 0) {
                    var ordersAsString = '';
                    if (ordersCount > 2) {
                        message = 'please hurry there are many hungry customers';
                    }
                    for (var i = 0; i < orders.length; i++) {
                        var order = orders[i];
                        ordersAsString = ordersAsString.concat(converter.toOrdinal(i + 1) + ' order is. ' + getOrderAsString(order));
                    }

                    that.emit(':tell', ordersAsString + ' ' + message);
                } else {
                    that.emit(':tell', 'There are no pending orders for the kitchen. well done. You are so fast.');
                }

            }
        }

        request(options, callback);

        function getOrderAsString(order) {
            var result = '';
            for (var i = 0; i < order.orderList.length; i++) {
                result = result.concat(order.orderList[i].quantity + ' ' + order.orderList[i].product.name + ', ')
            }

            return result;
        }

    },

    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '<p>Here are some things you can say:</p><p>Get current order</p><p>So how can I help?</p>', REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye.');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Yikes! Something went wrong.');
    }
};


