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
exports.LanguageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const language_level_type_1 = require("../common/constants/language-level-type");
const language_type_1 = require("../common/constants/language-type");
const AbstractCompositeDto_1 = require("../common/dto/AbstractCompositeDto");
const language_entity_1 = require("../entities/language.entity");
class LanguageDto extends AbstractCompositeDto_1.AbstractCompositeDto {
    constructor(language) {
        super();
        this.code = language.code;
        this.level = language.level;
    }
}
__decorate([
    swagger_1.ApiPropertyOptional(),
    class_validator_1.IsEnum(language_entity_1.LanguageEntity),
    __metadata("design:type", String)
], LanguageDto.prototype, "code", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    class_validator_1.IsEnum(language_level_type_1.LanguageLevelType),
    __metadata("design:type", String)
], LanguageDto.prototype, "level", void 0);
exports.LanguageDto = LanguageDto;
//# sourceMappingURL=LanguageDto.js.map