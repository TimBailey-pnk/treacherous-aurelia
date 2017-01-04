import { ValidationStrategy } from "./strategy/validation-strategy";
import { InlineStrategy } from "./strategy/inline-strategy";

export * from "./helper/class-helper";
export * from "./strategy/validation-strategy";
export * from "./strategy/inline-strategy";
export * from "./binding-behaviours/validate-binding-behaviour";
export * from "./attributes/validation-group-attribute";
export * from "./attributes/validation-options-attribute";
export * from "./attributes/validate-property-attribute";
export * from "./elements/validation-summary-element";

export function configure(aurelia) {
    aurelia.globalResources("./binding-behaviours/validate-binding-behaviour");
    aurelia.globalResources("./attributes/validation-group-attribute");
    aurelia.globalResources("./attributes/validation-options-attribute");
    aurelia.globalResources("./attributes/validate-property-attribute");
    aurelia.globalResources("./elements/validation-summary-element");

    aurelia.container.registerInstance(ValidationStrategy, new InlineStrategy());
}