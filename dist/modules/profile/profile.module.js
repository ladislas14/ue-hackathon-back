"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const language_repository_1 = require("../../repositories/language.repository");
const staffProfile_repository_1 = require("../../repositories/staffProfile.repository");
const studentProfile_repository_1 = require("../../repositories/studentProfile.repository");
const profile_controller_1 = require("./profile.controller");
const profile_service_1 = require("./profile.service");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                studentProfile_repository_1.StudentProfileRepository,
                staffProfile_repository_1.StaffProfileRepository,
                language_repository_1.LanguageRepository,
            ]),
        ],
        controllers: [profile_controller_1.ProfileController],
        exports: [profile_service_1.ProfileService],
        providers: [profile_service_1.ProfileService],
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map