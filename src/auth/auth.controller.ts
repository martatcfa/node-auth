import { 
	Get, 
	Post, 
	Body, 
	Controller,  
	HttpCode, 
	HttpStatus,  
	Request, 
	UseGuards,  
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingIn } from './signIn';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

  	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signIn: SingIn) {
		return this.authService.signIn(signIn.username, signIn.password);
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
