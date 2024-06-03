import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    //Função responsável por decriptografar o token
    //e extrair o objeto usuário contido dentro do token
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        //Extrai o token do cabeçalho da requisição
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    //utiliza a senha para descriptograr o token
                    //e extrair o objeto usuário contido no token 
                    secret: jwtConstants.secret
                }
            );
            
            //Adiciona o objeto usuário dentro da requisição
            //para ser acessado em nosso controller
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }

        return true;
    }

    //Função que procura e retira o token do cabeçalho da requisição
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

