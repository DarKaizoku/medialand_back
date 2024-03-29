import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UtilisateursService } from 'src/utilisateurs/utilisateurs.service';
import * as bcrypt from 'bcrypt';
import { Utilisateur } from 'src/utilisateurs/entities/utilisateur.entity';

@Injectable()
export class AuthService {
	constructor(
		private utilisateurService: UtilisateursService,
		private jwtService: JwtService
	) { }

	async validateUser(username: string, password: string): Promise<any> {
		const user = (await this.utilisateurService.findOnebyUsername(
			username
		)) as Utilisateur;

		const isMatch = await bcrypt.compare(password, user!.password);
		if (isMatch) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
		const payload = { username: user.username, sub: user.id, userStatus: user.admin };

		return {
			access_token: this.jwtService.sign(payload),
		};
	}
}
