import {
  expect, jest, it, beforeAll, describe, afterAll,
} from '@jest/globals';

import request from 'supertest';
import app from '../../src/app';
import { connection } from '../helper/database.config';

jest.setTimeout(10000);

export const defaultCategoryTest = {
  name: 'future',
  icon: 'icon_future',
  description: 'save money for the future',
};

describe('category CRUD', () => {
  beforeAll(async () => connection.create());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a category', async () => {
    const categoryTest = {
      name: 'future',
      icon: 'icon_future',
      description: 'save money for the future',
    };

    const response = await request(app).post('/category').send(categoryTest);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('name', categoryTest.name);
    expect(response.body.data).toHaveProperty('icon', categoryTest.icon);
    expect(response.body.data).toHaveProperty(
      'description',
      categoryTest.description,
    );
  });

  it('should get a category by id', async () => {
    const categoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
    };

    const postResponse = await request(app)
      .post('/category')
      .send(categoryTestGetById);

    const category = postResponse.body.data;

    const response = await request(app).get(`/category/${category.id}`).send();

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('name', categoryTestGetById.name);
    expect(response.body.data).toHaveProperty('icon', categoryTestGetById.icon);
    expect(response.body.data).toHaveProperty(
      'description',
      categoryTestGetById.description,
    );
  });

  it('should list all categories', async () => {
    await connection.clear();

    const categoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
    };

    await request(app).post('/category').send(categoryTestGetById);

    const response = await request(app).get('/category').send();

    expect(response.status).toBe(201);
    expect(response.body.data.length).toBe(1);
  });

  it('should list delete one categories', async () => {
    await connection.clear();

    const categoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
    };

    const { body } = await request(app)
      .post('/category')
      .send(categoryTestGetById);

    const response = await request(app)
      .delete(`/category/${body.data.id}`)
      .send();

    expect(response.status).toBe(201);
  });
});
