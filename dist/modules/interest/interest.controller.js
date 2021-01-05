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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.InterestController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const InterestDto_1 = require("../../dto/InterestDto");
const ProfileDto_1 = require("../../dto/ProfileDto");
const profile_entity_1 = require("../../entities/profile.entity");
const roles_guard_1 = require("../../guards/roles.guard");
const auth_user_interceptor_service_1 = require("../../interceptors/auth-user-interceptor.service");
const addInterestToProfileDto_1 = require("./dto/addInterestToProfileDto");
const interest_service_1 = require("./interest.service");
let InterestController = class InterestController {
    constructor(_interestService) {
        this._interestService = _interestService;
    }
    createInterest(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const interest = yield this._interestService.createInterest(name);
            return {
                description: 'Successfully created interest',
                data: interest,
            };
        });
    }
    addInterestToProfile(addInterestToProfileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this._interestService.addInterestToProfile(addInterestToProfileDto.profile, addInterestToProfileDto.interests);
            return {
                description: 'Successfully added interests to user',
                data: profile,
            };
        });
    }
    getProfileInterests(userProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            const interests = yield this._interestService.getProfileInterests(userProfile);
            return {
                description: "Profile's interests",
                data: interests,
            };
        });
    }
};
__decorate([
    common_1.Post('create'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: InterestDto_1.InterestDto,
        description: 'Create new interest',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "createInterest", null);
__decorate([
    common_1.Post('profile/add'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: ProfileDto_1.ProfileDto,
        description: 'Add new interests to profile',
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addInterestToProfileDto_1.AddInterestToProfileDto]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "addInterestToProfile", null);
__decorate([
    common_1.Get('profile'),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiOkResponse({
        type: InterestDto_1.InterestDto,
        description: "get a profile's interests",
    }),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [profile_entity_1.ProfileEntity]),
    __metadata("design:returntype", Promise)
], InterestController.prototype, "getProfileInterests", null);
InterestController = __decorate([
    common_1.Controller('interest'),
    swagger_1.ApiTags('interest'),
    common_1.UseGuards(passport_1.AuthGuard, roles_guard_1.RolesGuard),
    common_1.UseInterceptors(auth_user_interceptor_service_1.AuthUserInterceptor),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [interest_service_1.InterestService])
], InterestController);
exports.InterestController = InterestController;
//# sourceMappingURL=interest.controller.js.map