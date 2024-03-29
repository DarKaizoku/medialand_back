import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super();
	}

	async validate(username: string, password: string): Promise<any> {
		const check = await Utilisateur.findOneBy({ username });

		if (!check) {
			throw new UnauthorizedException('Compte inexistant');
		}
		const user = await this.authService.validateUser(
			username,
			password
		);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
