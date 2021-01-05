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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const role_type_1 = require("../common/constants/role-type");
const AbstractDto_1 = require("../common/dto/AbstractDto");
const utils_service_1 = require("../providers/utils.service");
const ProfileDto_1 = require("./ProfileDto");
class UserDto extends AbstractDto_1.AbstractDto {
    constructor(user) {
        super(user);
        this.role = user.role || role_type_1.RoleType.USER;
        this.email = user.email;
        this.active = user.active;
        this.onboarded = user.onboarded;
        this.verificationToken = user.verificationToken;
        this.profile = utils_service_1.UtilsService.isDto(user.profile)
            ? user.profile.toDto({ noDate: true })
            : user.profile;
    }
}
__decorate([
    swagger_1.ApiPropertyOptional({ enum: role_type_1.RoleType }),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], UserDto.prototype, "active", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", Boolean)
], UserDto.prototype, "onboarded", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", String)
], UserDto.prototype, "verificationToken", void 0);
__decorate([
    swagger_1.ApiPropertyOptional(),
    __metadata("design:type", ProfileDto_1.ProfileDto)
], UserDto.prototype, "profile", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=UserDto.js.map