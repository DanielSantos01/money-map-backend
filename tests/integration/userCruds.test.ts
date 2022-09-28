import request from 'supertest';
import app from '../../src/app';
import router from '../../src/routes'
import { connection } from '../helper/database.config';
import {expect, jest, test, it, beforeAll, describe, afterAll} from '@jest/globals';
import UserController from '../../src/controllers/UserController';
import { Router } from "express";

jest.setTimeout(10000)

describe('user CRUD', () => {
    beforeAll(async () => connection.create());

    afterAll(async () => {
        await connection.clear()
        await connection.close()
    });
    
    it('should create a user', async () => {
        const userTest = {
            name: 'Paula',
            email: 'mpps@gmail.com',
            password: 'abc123',
            income: 500,
        };
    
        const response = await request(app).post('/user').send(userTest);
    
        console.log(response.status)
        console.log('response', response.body)
    
        expect(response.status).toBe(201);
        expect(response.body.data).toHaveProperty('name', userTest.name);
        expect(response.body.data).toHaveProperty('email', userTest.email);
        expect(response.body.data).toHaveProperty('password', userTest.password);
        expect(response.body.data).toHaveProperty('income', userTest.income);
    });
})

