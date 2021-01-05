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
exports.UserRegisterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_decorator_1 = require("../../../decorators/validators.decorator");
class UserRegisterDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsEmail({}, { message: 'email.invalid' }),
    validators_decorator_1.IsSEAEmail({
        message: 'validation.email.invalidDomain',
    }),
    class_validator_1.IsNotEmpty(),
    swagger_1.ApiProperty(),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/, { message: 'validation.password.notStrongEnough' }),
    swagger_1.ApiProperty({ minLength: 8 }),
    __metadata("design:type", String)
], UserRegisterDto.prototype, "password", void 0);
exports.UserRegisterDto = UserRegisterDto;
//# sourceMappingURL=UserRegisterDto.js.map