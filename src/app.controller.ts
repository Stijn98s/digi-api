import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  index(@Res() response: Response) {
    response.redirect('/api');
  }
}
