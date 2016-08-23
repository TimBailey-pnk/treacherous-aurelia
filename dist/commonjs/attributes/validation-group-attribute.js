'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ValidationGroupAttribute = undefined;

var _dec, _class;

var _aureliaFramework = require('aurelia-framework');



var ValidationGroupAttribute = exports.ValidationGroupAttribute = (_dec = (0, _aureliaFramework.customAttribute)('validation-group'), _dec(_class = function () {
    function ValidationGroupAttribute() {
        
    }

    ValidationGroupAttribute.prototype.bind = function bind(binding, overrideContext) {
        overrideContext.validationGroup = this.value;
    };

    return ValidationGroupAttribute;
}()) || _class);