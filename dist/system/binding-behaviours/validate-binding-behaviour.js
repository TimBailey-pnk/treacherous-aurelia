"use strict";

System.register(["aurelia-framework", "../strategy/validation-strategy"], function (_export, _context) {
    "use strict";

    var inject, noView, ValidationStrategy, _dec, _dec2, _class, ValidateBindingBehavior;

    

    return {
        setters: [function (_aureliaFramework) {
            inject = _aureliaFramework.inject;
            noView = _aureliaFramework.noView;
        }, function (_strategyValidationStrategy) {
            ValidationStrategy = _strategyValidationStrategy.ValidationStrategy;
        }],
        execute: function () {
            _export("ValidateBindingBehavior", ValidateBindingBehavior = (_dec = inject(ValidationStrategy), _dec2 = noView(), _dec(_class = _dec2(_class = function () {
                function ValidateBindingBehavior(validationStrategy) {
                    

                    this.validationStrategy = validationStrategy;
                    console.log('ValidateBindingBehavior.constructor', validationStrategy);
                }

                ValidateBindingBehavior.prototype.bind = function bind(binding, overrideContext) {
                    var _this = this;

                    var treacherousState = {
                        element: binding.target,
                        propertyName: this.getTargetProperty(binding),
                        bindingContext: overrideContext.bindingContext,
                        validationGroup: overrideContext.bindingContext.validationGroup
                    };
                    console.log('ValidateBindingBehavior.bind', treacherousState.propertyName, treacherousState.element);

                    console.log('ValidateBindingBehavior.attached');
                    var _validationStateHandler = function _validationStateHandler(args) {
                        console.log('_validationStateHandler', args);
                        if (args.isValid) {
                            _this.validationStrategy.actionValidProperty(treacherousState.element, treacherousState.propertyName);
                        } else {
                            _this.validationStrategy.actionInvalidProperty(treacherousState.element, treacherousState.propertyName, args.error);
                        }
                    };

                    var _validationPredicate = function _validationPredicate(x) {
                        console.log('_validationStateHandler', x.property, treacherousState.propertyName);
                        return x.property == treacherousState.propertyName;
                    };

                    var _setupValidation = function _setupValidation() {
                        return treacherousState.validationGroup.propertyStateChangedEvent.subscribe(_validationStateHandler, _validationPredicate);
                    };

                    if (this._isWithinChildBinding(treacherousState.bindingContext)) {
                        treacherousState.bindingContext = treacherousState.bindingContext.parentOverrideContext;
                    }

                    if (treacherousState.validationGroup) {
                        treacherousState.activeSubscription = _setupValidation();
                        console.log('ValidateBindingBehavior.attached setup');
                        treacherousState.validationGroup.getPropertyError(treacherousState.propertyName).then(function (error) {
                            if (error) {
                                _this.validationStrategy.actionInvalidProperty(treacherousState.element, treacherousState.propertyName, error);
                            }
                        });
                    }

                    binding.treacherousState = treacherousState;
                };

                ValidateBindingBehavior.prototype.unbind = function unbind(binding, overrideContext) {
                    var treacherousState = binding.treacherousState;
                    if (treacherousState && treacherousState.activeSubscription) {
                        treacherousState.activeSubscription();
                        treacherousState.activeSubscription = null;
                    }
                };

                ValidateBindingBehavior.prototype.getTargetProperty = function getTargetProperty(binding) {
                    var targetProperty;
                    if (binding.sourceExpression && binding.sourceExpression.expression) {

                        if (binding.sourceExpression.expression.name) {
                            targetProperty = binding.sourceExpression.expression.name;
                        }
                    }

                    return targetProperty;
                };

                ValidateBindingBehavior.prototype._isWithinChildBinding = function _isWithinChildBinding(overrideContext) {
                    return overrideContext["$index"] || overrideContext["$even"] || overrideContext["$odd"];
                };

                return ValidateBindingBehavior;
            }()) || _class) || _class));

            _export("ValidateBindingBehavior", ValidateBindingBehavior);
        }
    };
});