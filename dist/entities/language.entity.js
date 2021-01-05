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
exports.LanguageEntity = void 0;
const typeorm_1 = require("typeorm");
const abstractComposite_entity_1 = require("../common/abstractComposite.entity");
const language_level_type_1 = require("../common/constants/language-level-type");
const language_type_1 = require("../common/constants/language-type");
const LanguageDto_1 = require("../dto/LanguageDto");
const profile_entity_1 = require("./profile.entity");
let LanguageEntity = class LanguageEntity extends abstractComposite_entity_1.AbstractCompositeEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = LanguageDto_1.LanguageDto;
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ type: 'enum', name: 'code' }),
    typeorm_1.Column({ enum: language_type_1.LanguageType, type: 'enum', primary: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ enum: language_level_type_1.LanguageLevelType, type: 'enum', nullable: true }),
    __metadata("design:type", String)
], LanguageEntity.prototype, "level", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: 'uuid', name: 'profile_id' }),
    typeorm_1.ManyToOne(() => profile_entity_1.ProfileEntity, (profile) => profile.languages, {
        primary: true,
        cascade: true,
    }),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], LanguageEntity.prototype, "profile", void 0);
LanguageEntity = __decorate([
    typeorm_1.Entity('language')
], LanguageEntity);
exports.LanguageEntity = LanguageEntity;
//# sourceMappingURL=language.entity.js.map