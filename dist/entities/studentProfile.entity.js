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
exports.StudentProfileEntity = void 0;
const typeorm_1 = require("typeorm");
const degree_type_1 = require("../common/constants/degree-type");
const profile_type_1 = require("../common/constants/profile-type");
const StudentProfileDto_1 = require("../dto/StudentProfileDto");
const profile_entity_1 = require("./profile.entity");
let StudentProfileEntity = class StudentProfileEntity extends profile_entity_1.ProfileEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = StudentProfileDto_1.StudentProfileDto;
    }
};
__decorate([
    typeorm_1.Column({ nullable: false, type: 'enum', enum: degree_type_1.DegreeType }),
    __metadata("design:type", String)
], StudentProfileEntity.prototype, "degree", void 0);
StudentProfileEntity = __decorate([
    typeorm_1.ChildEntity(profile_type_1.ProfileType.STUDENT)
], StudentProfileEntity);
exports.StudentProfileEntity = StudentProfileEntity;
//# sourceMappingURL=studentProfile.entity.js.map