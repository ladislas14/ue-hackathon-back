"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSEAEmail = exports.IsPassword = void 0;
const class_validator_1 = require("class-validator");
const sea_1 = require("../common/constants/sea");
const config_service_1 = require("../shared/services/config.service");
function IsPassword(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            name: 'isPassword',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    return /^[a-zA-Z0-9!@#$%^&*]*$/.test(value);
                },
            },
        });
    };
}
exports.IsPassword = IsPassword;
function IsSEAEmail(validationOptions) {
    return (object, propertyName) => {
        class_validator_1.registerDecorator({
            propertyName,
            name: 'isSEAEmail',
            target: object.constructor,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value, _args) {
                    const domain = value.split('@')[1];
                    const configService = new config_service_1.ConfigService();
                    if (configService.isProduction) {
                        return (sea_1.PARTNER_UNIVERSITIES.map((university) => university.domain).filter((x) => x === domain).length > 0);
                    }
                    return true;
                },
            },
        });
    };
}
exports.IsSEAEmail = IsSEAEmail;
//# sourceMappingURL=validators.decorator.js.map