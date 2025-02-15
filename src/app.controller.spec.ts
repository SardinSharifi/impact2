import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from './project/project.service';  // اضافه کردن ProjectService به عنوان وابستگی

describe('AppController', () => {
  let appController: AppController;
  let projectService: ProjectService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ProjectService,
          useValue: {
            searchJournal: jest.fn().mockResolvedValue({ journals: [], lists: [] }),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    projectService = app.get<ProjectService>(ProjectService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('searchJournal', () => {
    it('should return the correct result from searchJournal', async () => {
      const query = 'sample query';
      const result = await appController.searchJournal(query);
      expect(result.journals).toEqual([]);
      expect(result.lists).toEqual([]);
    });
  });
});
