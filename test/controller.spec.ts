import { Test } from '@nestjs/testing';
import { OrganismsController } from '../src/modules/organisms/organisms.controller';
import { CatchZonesController } from '../src/modules/catchzones/catchzone.controller';
import { PlayersController } from '../src/modules/players/players.controller';
import { TagsController } from '../src/modules/tags/tags.controller';
import { OrganismsRepository } from '../src/modules/organisms/organisms.repository';
import { QueryDto } from '../src/utils/QueryDto';
import { TagsRepository } from '../src/modules/tags/tags.repository';
import { PlayersRepository } from '../src/modules/players/players.repository';
import { CatchZonesRepository } from '../src/modules/catchzones/catchzone.repository';
import { AreasController } from '../src/modules/area/area.controller';
import { AreasRepository } from '../src/modules/area/area.repository';
// @ts-ignore

// , CatchZonesController, PlayersController, QuestionsController, TagsController,
const controllers = [[OrganismsController , OrganismsRepository]
  // , [CatchZonesController , CatchZonesRepository]
  , [AreasController , AreasRepository]
  , [PlayersController , PlayersRepository]
  , [TagsController , TagsRepository]];

for (const controllerPair of controllers) {
  const [controller, service] = controllerPair;
  let catsService;
  let catsController;
  describe(controller.name, () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        controllers: [controller],
        providers: [{provide: service, useValue: {find: () => ({}), get: () => ({}), create: () => ({}), edit: () => ({}), delete: () => ({})  }}],
      }).compile();

      // @ts-ignore
      catsService = module.get(service);
      catsController = module.get(controller.name);
    });

    it('get',  async () => {
      const result = [];
      jest.spyOn(catsService, 'find').mockImplementation(() => result);
      await expect(catsController.get(new QueryDto())).toBe(result);
    });

    it('getOne',  async () => {
      const result = {};
      jest.spyOn(catsService, 'get').mockImplementation(() => result);
      await expect(catsController.getOne('one')).toBe(result);
    });

    it('post',  async () => {
      const result = {};
      jest.spyOn(catsService, 'create').mockImplementation(() => result);
      expect(catsController.create({})).toBe(result);
    });

    it('put',  async () => {
      const result = {};
      jest.spyOn(catsService, 'edit').mockImplementation(() => result);
      expect(catsController.edit('', {})).toBe(result);
    });

    it('delete',  async () => {
      const result = {};
      jest.spyOn(catsService, 'delete').mockImplementation(() => result);
      expect(catsController.destroy('')).toBe(result);
    });
  });

}
