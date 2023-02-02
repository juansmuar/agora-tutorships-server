/* eslint-disable quote-props */
/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

afterAll(() => {
  mongoose.disconnect();
});

describe('Get User Data', () => {
  test ('Login returns user data correctly', async () => {
    const response = await request(app)
      .post('/login')
      .send({ 'email': 'user@test.com', 'password': '12345678' });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeTruthy();
    expect(response.body.userData).toBeTruthy();
  });
  test('received token is valid', async () => {
    const response = await request(app)
      .post('/login')
      .send({ 'email': 'user@test.com', 'password': '12345678' });
    const { token } = response.body;
    const data = jwt.verify(token, 'secret key');
    expect(data).toBeTruthy();
  });
});
