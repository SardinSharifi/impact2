import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectService } from './project/project.service';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';


describe('AppController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('searchJournal', () => {
    it('should return a response indicating no journals found', async () => {
      const response = await request(app.getHttpServer())
        .post('/search')
        .send({ query: 'sample query' })
        .expect(200);

      expect(response.text).toContain('هیچ مجله‌ای با این معیار پیدا نشد.');
    });
  });
});
