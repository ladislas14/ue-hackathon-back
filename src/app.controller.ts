import { Controller, Get } from '@nestjs/common';

import { PayloadSuccessDto } from './common/dto/PayloadSuccessDto';

@Controller()
export class AppController {
    @Get()
    home(): PayloadSuccessDto {
        return { description: 'Welcome to our API.' };
    }
}
