import {customElement, inlineView, inject, bindable} from "aurelia-framework";
import { I18N } from 'aurelia-i18n'

@inject(I18N)
@customElement("validation-summary")
@inlineView('<template><ul class="validation-summary" show.bind="propertyErrors.length"><li repeat.for="error of propertyErrors">${error.property} - ${error.error}</li></ul></template>')
export class ValidationSummary {

    @bindable validationGroup;

    constructor(i18n) {
        this.i18n = i18n;
        this.propertyErrors = [];
    }

    bind(binding, scope) {
        var validationGroup  = this.validationGroup || scope.validationGroup;

        if(!validationGroup) { throw new Error("No validation group in scope or explicitly provided"); }

        var refreshErrorSummary = () => {
            validationGroup.getModelErrors()
                .then((errors) => {
                    this.propertyErrors = [];
                    for(var propertyName in errors) {
                        this.propertyErrors.push({ property: propertyName, error: this.i18n.tr(errors[propertyName]) });
                    }
                });
        };

        this._activeSubscription = validationGroup.propertyStateChangedEvent.subscribe(refreshErrorSummary);
        refreshErrorSummary();
    }

    detached() {
        if(this._activeSubscription) {
            this._activeSubscription();
        }
    }
}