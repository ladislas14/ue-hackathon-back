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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../common/abstract.entity");
const role_type_1 = require("../common/constants/role-type");
const UserDto_1 = require("../dto/UserDto");
const profile_entity_1 = require("./profile.entity");
let UserEntity = class UserEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = UserDto_1.UserDto;
    }
};
__decorate([
    typeorm_1.Column({ type: 'enum', enum: role_type_1.RoleType, default: role_type_1.RoleType.USER }),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToOne(() => profile_entity_1.ProfileEntity, (profile) => profile.user),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], UserEntity.prototype, "profile", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    typeorm_1.Generated('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "verificationToken", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "active", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "onboarded", void 0);
UserEntity = __decorate([
    typeorm_1.Entity({ name: 'user' })
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map