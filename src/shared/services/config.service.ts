import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

import { SnakeNamingStrategy } from '../../snake-naming.strategy';
import { OrderSubscriber } from '../entity-subscribers/order-subscriber';
import { ProductSubscriber } from '../entity-subscribers/product-subscriber';
import { UserSubscriber } from '../entity-subscribers/user-subscriber';

export class ConfigService {
    constructor() {
        const nodeEnv = this.nodeEnv;
        dotenv.config({
            path: `.${nodeEnv}.env`,
        });

        // Replace \\n with \n to support multiline strings in AWS
        for (const envName of Object.keys(process.env)) {
            process.env[envName] = process.env[envName].replace(/\\n/g, '\n');
        }
    }

    get isDevelopment(): boolean {
        return this.nodeEnv === 'development';
    }

    get isProduction(): boolean {
        return this.nodeEnv === 'production' || this.nodeEnv === 'prod';
    }

    get debug(): boolean {
        return this.get('DEBUG') === '1';
    }

    public get(key: string): string {
        return process.env[key];
    }

    public getNumber(key: string): number {
        return Number(this.get(key));
    }

    get nodeEnv(): string {
        return this.get('NODE_ENV') || 'development';
    }

    get typeOrmConfig(): TypeOrmModuleOptions {
        let entities = [__dirname + '/../../entities/*.entity{.ts,.js}'];
        let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

        if ((<any>module).hot) {
            const entityContext = (<any>require).context(
                './../../modules',
                true,
                /\.entity\.ts$/,
            );
            entities = entityContext.keys().map((id) => {
                const entityModule = entityContext(id);
                const [entity] = Object.values(entityModule);
                return entity;
            });
            const migrationContext = (<any>require).context(
                './../../migrations',
                false,
                /\.ts$/,
            );
            migrations = migrationContext.keys().map((id) => {
                const migrationModule = migrationContext(id);
                const [migration] = Object.values(migrationModule);
                return migration;
            });
        }

        const scalingoDatabaseUrl = this.get('SCALINGO_POSTGRESQL_URL');

        if (scalingoDatabaseUrl) {
            const scalingoDatabaseConfig = parse(
                this.get('SCALINGO_POSTGRESQL_URL'),
            );

            return {
                entities,
                migrations,
                keepConnectionAlive: true,
                type: 'postgres',
                ssl: {
                    rejectUnauthorized: false,
                },
                host: scalingoDatabaseConfig.host,
                port: parseInt(scalingoDatabaseConfig.port, 10),
                username: scalingoDatabaseConfig.user,
                password: scalingoDatabaseConfig.password,
                database: scalingoDatabaseConfig.database,
                subscribers: [
                    UserSubscriber,
                    ProductSubscriber,
                    OrderSubscriber,
                ],
                migrationsRun: false,
                synchronize: true,
                logging: this.debug,
                namingStrategy: new SnakeNamingStrategy(),
            };
        }

        return {
            entities,
            migrations,
            keepConnectionAlive: true,
            type: 'postgres',
            host: this.get('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            username: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
            subscribers: [UserSubscriber, ProductSubscriber, OrderSubscriber],
            migrationsRun: false,
            synchronize: true,
            logging: this.debug,
            namingStrategy: new SnakeNamingStrategy(),
        };
    }

    get postgresIoAdapterConfig(): any {
        return {
            host: this.get('DB_HOST'),
            port: this.getNumber('DB_PORT'),
            user: this.get('DB_USERNAME'),
            password: this.get('DB_PASSWORD'),
            database: this.get('DB_DATABASE'),
        };
    }
}
