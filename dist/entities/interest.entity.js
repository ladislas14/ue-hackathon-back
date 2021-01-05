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
exports.InterestEntity = void 0;
const typeorm_1 = require("typeorm");
const abstract_entity_1 = require("../common/abstract.entity");
const InterestDto_1 = require("../dto/InterestDto");
const profile_entity_1 = require("./profile.entity");
let InterestEntity = class InterestEntity extends abstract_entity_1.AbstractEntity {
    constructor() {
        super(...arguments);
        this.dtoClass = InterestDto_1.InterestDto;
    }
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], InterestEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.ManyToMany(() => profile_entity_1.ProfileEntity, (profile) => profile.interests),
    __metadata("design:type", profile_entity_1.ProfileEntity)
], InterestEntity.prototype, "profile", void 0);
InterestEntity = __decorate([
    typeorm_1.Entity('interest')
], InterestEntity);
exports.InterestEntity = InterestEntity;
//# sourceMappingURL=interest.entity.js.map