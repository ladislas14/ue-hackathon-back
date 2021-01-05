"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterestDto = void 0;
const AbstractDto_1 = require("../common/dto/AbstractDto");
class InterestDto extends AbstractDto_1.AbstractDto {
    constructor(interest) {
        super(interest);
        this.name = interest.name;
    }
}
exports.InterestDto = InterestDto;
//# sourceMappingURL=InterestDto.js.map