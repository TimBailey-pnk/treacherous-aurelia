import {inject, noView} from "aurelia-framework";
import {ValidationStrategy} from "../strategy/validation-strategy";

@inject(ValidationStrategy)
@noView()
export class ValidateBindingBehavior
{
    constructor(validationStrategy) {
        this.validationStrategy = validationStrategy;
        console.log('ValidateBindingBehavior.constructor', validationStrategy);
    }

    bind(binding, overrideContext) {
        let treacherousState = {
            element: binding.target,
            propertyName: this.getTargetProperty(binding),
            bindingContext: overrideContext.bindingContext,
            validationGroup: overrideContext.bindingContext.validationGroup
        }
        console.log('ValidateBindingBehavior.bind', treacherousState.propertyName, treacherousState.element);

        console.log('ValidateBindingBehavior.attached');
        let _validationStateHandler = (args) => {
            console.log('_validationStateHandler', args);
            if(args.isValid)
            { this.validationStrategy.actionValidProperty(treacherousState.element, treacherousState.propertyName); }
            else
            { this.validationStrategy.actionInvalidProperty(treacherousState.element, treacherousState.propertyName, args.error); }
        };

        let _validationPredicate = (x) => { 
            console.log('_validationStateHandler', x.property, treacherousState.propertyName);
            return x.property == treacherousState.propertyName; 
        };

        let _setupValidation = () => {
            return treacherousState.validationGroup.propertyStateChangedEvent.subscribe(_validationStateHandler, _validationPredicate);
        };

        if (this._isWithinChildBinding(treacherousState.bindingContext)) {
            treacherousState.bindingContext = treacherousState.bindingContext.parentOverrideContext;
        }

        // this.validationOptions = treacherousState.bindingContext.validationOptions || {};

        if(treacherousState.validationGroup) {
            treacherousState.activeSubscription = _setupValidation();
            console.log('ValidateBindingBehavior.attached setup');
            treacherousState.validationGroup.getPropertyError(treacherousState.propertyName)
                .then((error) => {
                    if(error) {
                        this.validationStrategy.actionInvalidProperty(treacherousState.element, treacherousState.propertyName, error);
                    }
                });
        }

        binding.treacherousState = treacherousState;
    }

    unbind(binding, overrideContext) {
        let treacherousState = binding.treacherousState;
        if(treacherousState && treacherousState.activeSubscription) {
            treacherousState.activeSubscription();
            treacherousState.activeSubscription = null;
        }
    }

    getTargetProperty(binding) {
        var targetProperty;
        if (binding.sourceExpression && binding.sourceExpression.expression) {

            if(binding.sourceExpression.expression.name)
            { targetProperty = binding.sourceExpression.expression.name; }
        }

        return targetProperty;
    }

    _isWithinChildBinding(overrideContext) {
        return overrideContext["$index"] || overrideContext["$even"] || overrideContext["$odd"];
    }
}