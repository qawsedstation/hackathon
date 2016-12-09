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
        this.emit(':tell', 'Our bundles are');
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', '<p>Here are some things you can say:</p><p>What\'s my current balance?</p><p>So how can I help?</p>', REPROMPT);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye.');
    },
    'Unhandled': function () {
        this.emit(':ask', 'Yikes! Something went wrong.');
    }
};

