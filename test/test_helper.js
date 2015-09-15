var chai = require('chai')
   , sinon = require('sinon');

chai.should();
chai.Assertion.includeStack = true;

global.sinon = sinon;
global.assert = chai.assert;
global.expect = chai.expect;
