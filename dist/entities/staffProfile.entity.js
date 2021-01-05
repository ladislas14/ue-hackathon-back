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
exports.StaffProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const profile_type_1 = require("../common/constants/profile-type");
const staff_role_type_1 = require("../common/constants/staff-role-type");
const StaffProfileDto_1 = require("../dto/StaffProfileDto");
const profile_entity_1 = require("./profile.entity");
let StaffProfileEntity = class StaffProfileEntity extends profile_entity_1.ProfileEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = StaffProfileDto_1.StaffProfileDto;
    }
};
__decorate([
    typeorm_1.Column({ type: 'enum', enum: staff_role_type_1.StaffRoleType }),
    __metadata("design:type", String)
], StaffProfileEntity.prototype, "staffRole", void 0);
StaffProfileEntity = __decorate([
    typeorm_1.ChildEntity(profile_type_1.ProfileType.STAFF)
], StaffProfileEntity);
exports.StaffProfileEntity = StaffProfileEntity;
//# sourceMappingURL=staffProfile.entity.js.map