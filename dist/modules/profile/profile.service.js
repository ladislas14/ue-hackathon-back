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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const profile_type_1 = require("../../common/constants/profile-type");
const language_repository_1 = require("../../repositories/language.repository");
const staffProfile_repository_1 = require("../../repositories/staffProfile.repository");
const studentProfile_repository_1 = require("../../repositories/studentProfile.repository");
let ProfileService = class ProfileService {
    constructor(_studentProfileRepository, _staffProfileRepository, _languageRepository) {
        this._studentProfileRepository = _studentProfileRepository;
        this._staffProfileRepository = _staffProfileRepository;
        this._languageRepository = _languageRepository;
    }
    createProfile(profileCreationDto, type, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let savedProfile;
            if (type === profile_type_1.ProfileType.STUDENT) {
                const profile = this._studentProfileRepository.create();
                Object.assign(profile, profileCreationDto);
                profile.user = user;
                savedProfile = yield this._studentProfileRepository.save(profile);
            }
            else {
                const profile = this._staffProfileRepository.create();
                Object.assign(profile, profileCreationDto);
                profile.user = user;
                savedProfile = yield this._staffProfileRepository.save(profile);
            }
            if (savedProfile.languages) {
                yield this._languageRepository.save(savedProfile.languages.map((language) => Object.assign(this._languageRepository.create(), Object.assign(Object.assign({}, language), { profile: savedProfile.id }))));
            }
            return savedProfile;
        });
    }
};
ProfileService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [studentProfile_repository_1.StudentProfileRepository,
        staffProfile_repository_1.StaffProfileRepository,
        language_repository_1.LanguageRepository])
], ProfileService);
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map