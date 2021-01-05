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
exports.ProfileCreationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const gender_type_1 = require("../../../common/constants/gender-type");
const nationality_type_1 = require("../../../common/constants/nationality-type");
class ProfileCreationDto {
}
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProfileCreationDto.prototype, "firstName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProfileCreationDto.prototype, "lastName", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ProfileCreationDto.prototype, "university", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(gender_type_1.GenderType),
    __metadata("design:type", String)
], ProfileCreationDto.prototype, "gender", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    __metadata("design:type", Date)
], ProfileCreationDto.prototype, "birthdate", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsEnum(nationality_type_1.NationalityType),
    __metadata("design:type", String)
], ProfileCreationDto.prototype, "nationality", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], ProfileCreationDto.prototype, "languages", void 0);
exports.ProfileCreationDto = ProfileCreationDto;
//# sourceMappingURL=ProfileCreationDto.js.map