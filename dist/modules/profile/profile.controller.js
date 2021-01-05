'use strict';
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
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const profile_type_1 = require("../../common/constants/profile-type");
const auth_user_decorator_1 = require("../../decorators/auth-user.decorator");
const ProfileDto_1 = require("../../dto/ProfileDto");
const user_entity_1 = require("../../entities/user.entity");
const auth_guard_1 = require("../../guards/auth.guard");
const roles_guard_1 = require("../../guards/roles.guard");
const auth_user_interceptor_service_1 = require("../../interceptors/auth-user-interceptor.service");
const StaffProfileCreationDto_1 = require("./dto/StaffProfileCreationDto");
const StudentProfileCreationDto_1 = require("./dto/StudentProfileCreationDto");
const profile_service_1 = require("./profile.service");
let ProfileController = class ProfileController {
    constructor(_profileService) {
        this._profileService = _profileService;
    }
    createProfile(type, profileCreationDto, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdProfile = yield this._profileService.createProfile(profileCreationDto, type, user);
            return {
                description: 'Profile successfully created',
                data: createdProfile,
            };
        });
    }
};
__decorate([
    common_1.Post(),
    common_1.HttpCode(common_1.HttpStatus.OK),
    swagger_1.ApiBearerAuth(),
    swagger_1.ApiExtraModels(StaffProfileCreationDto_1.StaffProfileCreationDto, StudentProfileCreationDto_1.StudentProfileCreationDto),
    swagger_1.ApiResponse({
        status: common_1.HttpStatus.CREATED,
        description: 'Profile successfully created',
        type: ProfileDto_1.ProfileDto,
    }),
    swagger_1.ApiBody({
        schema: {
            oneOf: [
                { $ref: swagger_1.getSchemaPath(StaffProfileCreationDto_1.StaffProfileCreationDto) },
                { $ref: swagger_1.getSchemaPath(StudentProfileCreationDto_1.StudentProfileCreationDto) },
            ],
            discriminator: { propertyName: 'type' },
        },
    }),
    swagger_1.ApiQuery({ name: 'type', enum: profile_type_1.ProfileType }),
    __param(0, common_1.Query('type')),
    __param(1, common_1.Body()),
    __param(2, auth_user_decorator_1.AuthUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createProfile", null);
ProfileController = __decorate([
    common_1.Controller('profile'),
    swagger_1.ApiTags('profile'),
    common_1.UseGuards(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    common_1.UseInterceptors(auth_user_interceptor_service_1.AuthUserInterceptor),
    swagger_1.ApiBearerAuth(),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map