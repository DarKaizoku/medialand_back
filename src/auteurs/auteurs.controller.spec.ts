/* import { AuteursController } from './auteurs.controller';
import { AuteursService } from './auteurs.service';
import { Auteur } from './entities/auteur.entity';

describe('CatsController', () => {
	let auteursController: AuteursController;
	let auteursService: AuteursService;

	beforeEach(() => {
		auteursService = new AuteursService();
		auteursController = new AuteursController(auteursService);
	});

	describe('findAll', () => {
		it('should return an array of cats', async () => {
			const result = [Auteur];
			jest.spyOn(
				auteursService,
				'findAll'
			).mockImplementation(() => result);

			expect(await auteursController.findAll()).toBe(result);
		});
	});
});
 */
