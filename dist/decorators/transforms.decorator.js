"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToArray = exports.ToInt = exports.Trim = void 0;
const class_transformer_1 = require("class-transformer");
const _ = require("lodash");
function Trim() {
    return class_transformer_1.Transform((value) => {
        if (_.isArray(value)) {
            return value.map((v) => _.trim(v).replace(/\s\s+/g, ' '));
        }
        return _.trim(value).replace(/\s\s+/g, ' ');
    });
}
exports.Trim = Trim;
function ToInt() {
    return class_transformer_1.Transform((value) => parseInt(value, 10), { toClassOnly: true });
}
exports.ToInt = ToInt;
function ToArray() {
    return class_transformer_1.Transform((value) => {
        if (_.isNil(value)) {
            return [];
        }
        return _.castArray(value);
    }, { toClassOnly: true });
}
exports.ToArray = ToArray;
//# sourceMappingURL=transforms.decorator.js.map