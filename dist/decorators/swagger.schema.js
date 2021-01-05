"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiFile = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.ApiFile = (fileName = 'file', options = {}) => (target, propertyKey, descriptor) => {
    const { isRequired = false, isArray = false } = options;
    let fileSchema = {
        type: 'string',
        format: 'binary',
    };
    if (isArray) {
        fileSchema = {
            type: 'array',
            items: fileSchema,
        };
    }
    return swagger_1.ApiBody({
        required: isRequired,
        schema: {
            type: 'object',
            properties: {
                [fileName]: fileSchema,
            },
        },
    })(target, propertyKey, descriptor);
};
//# sourceMappingURL=swagger.schema.js.map