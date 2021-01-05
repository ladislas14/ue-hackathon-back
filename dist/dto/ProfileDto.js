"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const AbstractDto_1 = require("../common/dto/AbstractDto");
const utils_service_1 = require("../providers/utils.service");
class ProfileDto extends AbstractDto_1.AbstractDto {
    constructor(profile) {
        super(profile);
        this.firstName = profile.firstName;
        this.lastName = profile.lastName;
        this.university = profile.university;
        this.languages = utils_service_1.UtilsService.isDtos(profile.languages)
            ? profile.languages.toDtos()
            : profile.languages;
    }
}
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ProfileDto.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ProfileDto.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], ProfileDto.prototype, "university", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Array)
], ProfileDto.prototype, "languages", void 0);
exports.ProfileDto = ProfileDto;
//# sourceMappingURL=ProfileDto.js.map