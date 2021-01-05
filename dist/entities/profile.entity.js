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
exports.ProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../common/abstract.entity");
const gender_type_1 = require("../common/constants/gender-type");
const nationality_type_1 = require("../common/constants/nationality-type");
const profile_type_1 = require("../common/constants/profile-type");
const ProfileDto_1 = require("../dto/ProfileDto");
const interest_entity_1 = require("./interest.entity");
const language_entity_1 = require("./language.entity");
const user_entity_1 = require("./user.entity");
let ProfileEntity = class ProfileEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = ProfileDto_1.ProfileDto;
    }
};
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "university", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.UserEntity, (user) => user.profile),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_entity_1.UserEntity)
], ProfileEntity.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(() => interest_entity_1.InterestEntity, (interests) => interests.profile),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "interests", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, type: 'timestamp without time zone' }),
    __metadata("design:type", Date)
], ProfileEntity.prototype, "birthdate", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: gender_type_1.GenderType, default: gender_type_1.GenderType.OTHER }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column({
        type: 'enum',
        enum: nationality_type_1.NationalityType,
    }),
    __metadata("design:type", String)
], ProfileEntity.prototype, "nationality", void 0);
__decorate([
    typeorm_1.OneToMany(() => language_entity_1.LanguageEntity, (language) => language.profile),
    __metadata("design:type", Array)
], ProfileEntity.prototype, "languages", void 0);
ProfileEntity = __decorate([
    typeorm_1.Entity('profile'),
    typeorm_1.TableInheritance({ column: { type: 'enum', name: 'type', enum: profile_type_1.ProfileType } })
], ProfileEntity);
exports.ProfileEntity = ProfileEntity;
//# sourceMappingURL=profile.entity.js.map