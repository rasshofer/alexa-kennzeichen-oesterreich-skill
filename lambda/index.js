'use strict';

var path = require('path');
var sdk = require('alexa-sdk');

var speechOutput = {
  SKILL_NAME: 'Kennzeichen Österreich',
  WELCOME_MESSAGE: 'Willkommen zu Kennzeichen Österreich.',
  HELP_MESSAGE: 'Frage mich einfach nach einem Kennzeichen.',
  HELP_REPROMPT: 'Wie kann ich dir helfen?',
  STOP_MESSAGE: 'Auf Wiedersehen!',
  LIST: require(path.resolve(__dirname, 'list.json'))
};

var handlers = {
  LaunchRequest: function () {
    this.emit(':ask', speechOutput.WELCOME_MESSAGE + ' ' + speechOutput.HELP_MESSAGE);
  },
  GetAbbreviationIntent: function () {
    var abbreviation = this.event.request.intent.slots.Abbreviation.value.toUpperCase().replace(/[\s\.]+/gi, '');
    var response;
    if (speechOutput.LIST[abbreviation]) {
      response = abbreviation + ' ist das Kennzeichen von ' + speechOutput.LIST[abbreviation].title + (speechOutput.LIST[abbreviation].title !== speechOutput.LIST[abbreviation].state ? ' in ' + speechOutput.LIST[abbreviation].state : '');
    } else {
      response = 'Dieses Kennzeichen kenne ich leider nicht.';
    }
    this.emit(':tell', response);
  },
  'AMAZON.HelpIntent': function () {
    this.emit(':ask', speechOutput.HELP_MESSAGE, speechOutput.HELP_REPROMPT);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', speechOutput.STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', speechOutput.STOP_MESSAGE);
  }
};

module.exports = {
  handler: function (event, context, callback) {
    var alexa = sdk.handler(event, context);
    alexa.appId = 'amzn1.ask.skill.8510196c-a6b6-4745-8158-98f6e99dfee1';
    alexa.registerHandlers(handlers);
    alexa.execute();
  }
};
