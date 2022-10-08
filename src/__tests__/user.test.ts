/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';
// @ts-ignore
import { DbDrop, MigrateDev } from '@prisma/migrate';
import { randomUUID } from 'crypto';
import supertest from 'supertest';
import createServer from '../server';
import * as UserService from '../services/user.service';

const app = createServer();

const userInput = {
  firstName: `Jane-${randomUUID()}`,
  lastName: 'Doe',
  email: `test@test-${randomUUID()}.com`,
  password: 'password12345',
  passwordConfirmation: 'password12345',
};

const uid = randomUUID();

const userPayload = {
  id: uid,
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'test@test.com',
  sessions: [],
  bucketLists: [],
};

describe('user', () => {
  beforeAll(async () => {
    // migrate
    await MigrateDev.new().parse([]);

    const client = new PrismaClient({});

    await client.$disconnect();
  });

  afterAll(async () => {
    await DbDrop.new().parse(['--preview-feature', '--force']);
  });

  test('registers user when correct information is provided', async () => {
    const userServiceMock = jest
      .spyOn(UserService, 'createUser')
      // @ts-ignore
      .mockReturnValueOnce(userPayload);

    const { statusCode, body } = await supertest(app)
      .post('/api/users')
      .send(userInput);

    expect(statusCode).toBe(201);

    expect(body).toEqual({
      user: userPayload,
    });

    expect(userServiceMock).toHaveBeenCalledWith(userInput);
  });

  test('throws error if passwords do not match', async () => {
    const userServiceMock = jest
      .spyOn(UserService, 'createUser')
      // @ts-ignore
      .mockReturnValueOnce(userPayload);

    const { statusCode } = await supertest(app)
      .post('/api/users')
      .send({ ...userInput, passwordConfirmation: 'yo' });

    expect(statusCode).toBe(400);

    expect(userServiceMock).not.toHaveBeenCalled();
  });
});
