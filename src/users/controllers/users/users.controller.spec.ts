import { UsersService } from './../../services/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let module: TestingModule;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('general test', () => {
    it('should be defined', () => {
      const controller: UsersController = module.get<UsersController>(UsersController);
      expect(controller).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [];
      jest.spyOn(usersService, 'findAll').mockImplementation(() => result);
      expect(await usersService.findAll({ page: 1, limit: 10, order: 'abc', sort: 'abc' })).toBe(result);
    });
  });

  describe('create', () => {
    it('should return an new user', async () => {
      const result = { id: 0, username: 'Denis', email: 'limarenkodenis@gmail.com' };
      const userToCreate = { username: 'Denis', email: 'limarenkodenis@gmail.com' };

      jest.spyOn(usersService, 'create').mockImplementation(() => result);
      expect(await usersService.create(userToCreate)).toBe(result);
    });
  });

});
