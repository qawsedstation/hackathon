'use strict';
var alexaSDK = require('alexa-sdk');


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
    'GiffGafferIntent': function () {
        this.emit(':ask', 'tell me your name');
    },
    'GiffGaffBundlesIntent': function () {
        this.emit(':tell', "Our plans are. 8 pound goodybag gives you 6 gigabytes data, 2000 minutes, unlimited texts. 20 pound goodybag gives you always on data, unlimited minutes, unlimited texts. 5 pound goodybag gives you 100 me \
        gabytes data, 125 minutes, 500 texts. 7 pound 50 goodybag gives you 500 megabytes data, 250 minutes, unlimited texts. 10 pound goodybag gives you 1 gigabyte data, 500 minutes, unlimited text  \
        s. 10 pound goodybag gives you 2 gigabytes data, 100 minutes, unlimited texts. 12 pound goodybag gives you 2 gigabytes data, 500 minutes, unlimited texts. 15 pound goodybag gives you 4 gigab \
        ytes data, 1000 minutes, unlimited texts. 18 pound goodybag gives you 4 gigabytes data, 1000 minutes, unlimited texts."  );
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

