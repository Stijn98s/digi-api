import { NewPlayerDto } from '../users/newPlayerDto';
import { Body, Controller, Get, Post, Req, UseGuards, Inject, forwardRef } from '@nestjs/common';
import { SignInDto } from './signInDto';
import { Roles } from '../../decorators';
import { JWTDto } from './JWTDto';
import { AuthService } from './auth.service';
import { SignUpDto } from './signUpDto';
import { ApiUseTags, ApiProduces, ApiOkResponse, ApiConflictResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AppSignUpDto } from './app.signup.dtto';
import { RolesGuard } from '../../guards/roles.guard';

@ApiUseTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor( private authService: AuthService ) {
  }

  @ApiProduces('application/json')
  @ApiOkResponse({ description: 'OK', type: NewPlayerDto })
  @ApiConflictResponse({ description: 'Conflict' })
  @Post('appsignup')
  async applocalSignup(@Body() signUp: AppSignUpDto) {
    return await this.authService.registerApp(signUp);
  }

  @ApiProduces('application/json')
  @ApiOkResponse({ description: 'OK', type: JWTDto })
  @Post('applocal')
  @UseGuards(AuthGuard('applocal'))
  applocalSignin(@Body() signUp: SignInDto, @Req() req) {
    const jwt: string = req.user.jwt;
    return new JWTDto(jwt);
  }

  @ApiProduces('application/json')
  @ApiOkResponse({ description: 'OK', type: JWTDto })
  @Post('local')
  @UseGuards(AuthGuard('local'))
  localSignin(@Body() signUp: SignUpDto, @Req() req) {
    const jwt: string = req.user.jwt;
    return new JWTDto(jwt);
  }

  @ApiBearerAuth()
  @Get('protected')
  @UseGuards(AuthGuard(), RolesGuard)
  protectedResource() {
    return 'JWT is working!';
  }
}
