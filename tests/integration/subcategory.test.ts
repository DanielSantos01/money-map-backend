import {
  expect, jest, it, beforeAll, describe, afterAll,
} from '@jest/globals';

import request from 'supertest';
import app from '../../src/app';
import { connection } from '../helper/database.config';

import { defaultCategoryTest } from './category.tes';

jest.setTimeout(10000);

describe('subcategory CRUD', () => {
  beforeAll(async () => connection.create());

  afterAll(async () => {
    await connection.clear();
    await connection.close();
  });

  it('should create a subcategory', async () => {
    const category = await request(app)
      .post('/category')
      .send(defaultCategoryTest);

    const subcategoryTest = {
      name: 'sub_future',
      icon: 'sub_icon_future',
      description: 'save money for the future',
      categoryId: category.body.data.id,
    };

    const response = await request(app)
      .post('/subcategory')
      .send(subcategoryTest);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('name', subcategoryTest.name);
    expect(response.body.data).toHaveProperty('icon', subcategoryTest.icon);
    expect(response.body.data).toHaveProperty(
      'description',
      subcategoryTest.description,
    );
  });

  it('should get a subcategory by id', async () => {
    const category = await request(app)
      .post('/category')
      .send(defaultCategoryTest);

    const subcategoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
      categoryId: category.body.data.id,
    };

    const postResponse = await request(app)
      .post('/subcategory')
      .send(subcategoryTestGetById);

    const subcategory = postResponse.body.data;

    const response = await request(app)
      .get(`/subcategory/${subcategory.id}`)
      .send();

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty(
      'name',
      subcategoryTestGetById.name,
    );
    expect(response.body.data).toHaveProperty(
      'icon',
      subcategoryTestGetById.icon,
    );
    expect(response.body.data).toHaveProperty(
      'description',
      subcategoryTestGetById.description,
    );

    expect(response.body.data.category).toHaveProperty(
      'name',
      defaultCategoryTest.name,
    );
    expect(response.body.data.category).toHaveProperty(
      'icon',
      defaultCategoryTest.icon,
    );
    expect(response.body.data.category).toHaveProperty(
      'description',
      defaultCategoryTest.description,
    );
  });

  it('should list all subcategories', async () => {
    await connection.clear();

    const category = await request(app)
      .post('/category')
      .send(defaultCategoryTest);

    const subcategoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
      categoryId: category.body.data.id,
    };

    await request(app).post('/subcategory').send(subcategoryTestGetById);

    const response = await request(app).get('/subcategory').send();

    expect(response.status).toBe(201);
    expect(response.body.data.length).toBe(1);
  });

  it('should list delete one categories', async () => {
    await connection.clear();

    const category = await request(app)
      .post('/category')
      .send(defaultCategoryTest);

    const subcategoryTestGetById = {
      name: 'balance',
      icon: 'balance_icon',
      description: 'current balance',
      categoryId: category.body.data.id,
    };

    const { body } = await request(app)
      .post('/subcategory')
      .send(subcategoryTestGetById);

    const response = await request(app)
      .delete(`/subcategory/${body.data.id}`)
      .send();

    expect(response.status).toBe(201);
  });
});
