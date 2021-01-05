"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("./boilerplate.polyfill");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const middlewares_1 = require("./middlewares");
const auth_module_1 = require("./modules/auth/auth.module");
const interest_module_1 = require("./modules/interest/interest.module");
const profile_module_1 = require("./modules/profile/profile.module");
const user_module_1 = require("./modules/user/user.module");
const config_service_1 = require("./shared/services/config.service");
const shared_module_1 = require("./shared/shared.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(middlewares_1.contextMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            profile_module_1.ProfileModule,
            interest_module_1.InterestModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [shared_module_1.SharedModule],
                useFactory: (configService) => configService.typeOrmConfig,
                inject: [config_service_1.ConfigService],
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map