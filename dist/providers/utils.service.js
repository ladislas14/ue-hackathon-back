"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsService = void 0;
const bcrypt = require("bcrypt");
const _ = require("lodash");
class UtilsService {
    static toDto(model, entity, options) {
        if (_.isArray(entity)) {
            return entity.map((u) => new model(u, options));
        }
        return new model(entity, options);
    }
    static generateHash(password) {
        return bcrypt.hashSync(password, 10);
    }
    static generateRandomString(length) {
        return Math.random()
            .toString(36)
            .replace(/[^a-zA-Z0-9]+/g, '')
            .substr(0, length);
    }
    static validateHash(password, hash) {
        return bcrypt.compare(password, hash || '');
    }
}
exports.UtilsService = UtilsService;
UtilsService.isDto = (obj) => {
    if (obj && obj.dtoClass) {
        return true;
    }
    return false;
};
UtilsService.isDtos = (arr) => {
    if (arr) {
        return arr.every(UtilsService.isDto);
    }
    return false;
};
//# sourceMappingURL=utils.service.js.map