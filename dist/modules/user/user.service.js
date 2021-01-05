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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const PageMetaDto_1 = require("../../common/dto/PageMetaDto");
const aws_s3_service_1 = require("../../shared/services/aws-s3.service");
const validator_service_1 = require("../../shared/services/validator.service");
const UsersPageDto_1 = require("./dto/UsersPageDto");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository, validatorService, awsS3Service) {
        this.userRepository = userRepository;
        this.validatorService = validatorService;
        this.awsS3Service = awsS3Service;
    }
    findOne(findData) {
        return this.userRepository.findOne(findData);
    }
    findByUsernameOrEmail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.userRepository.createQueryBuilder('user');
            if (options.email) {
                queryBuilder.orWhere('user.email = :email', {
                    email: options.email,
                });
            }
            if (options.username) {
                queryBuilder.orWhere('user.username = :username', {
                    username: options.username,
                });
            }
            return queryBuilder.getOne();
        });
    }
    createUser(userRegisterDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(Object.assign({}, userRegisterDto));
            return this.userRepository.save(user);
        });
    }
    verifyUser(userVerificationQueryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                email: userVerificationQueryDto.email,
                verificationToken: userVerificationQueryDto.token,
            });
            if (user) {
                user.active = true;
                return this.userRepository.save(user);
            }
            return null;
        });
    }
    getUsers(pageOptionsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = this.userRepository.createQueryBuilder('user');
            const [users, usersCount] = yield queryBuilder
                .skip(pageOptionsDto.skip)
                .take(pageOptionsDto.take)
                .getManyAndCount();
            const pageMetaDto = new PageMetaDto_1.PageMetaDto({
                pageOptionsDto,
                itemCount: usersCount,
            });
            return new UsersPageDto_1.UsersPageDto(users.toDtos(), pageMetaDto);
        });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        validator_service_1.ValidatorService,
        aws_s3_service_1.AwsS3Service])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map