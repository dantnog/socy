import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../../index'


const agent = request.agent(app)

/**
 * 
 *  SIGN IN
 * 
 */
describe('User signin', () => {
  it('should create the user', async () => {
    await agent.post('/users/signin')
      .send({name: 'Test', email: 'test@test.com', password: 'test'})
      .expect(201)
  })
  it('should fail because of missing name', async () => {
    await agent.post('/users/signin')
      .send({name: '', email: 'test@test.com', password: 'test'})
      .expect(422)
  })
  it('should fail because of missing email', async () => {
    await agent.post('/users/signin')
      .send({name: 'Teste', email: '', password: 'test'})
      .expect(422)
  })
  it('should fail because of missing password', async () => {
    await agent.post('/users/signin')
      .send({name: 'Teste', email: 'test@test.com', password: ''})
      .expect(422)
  })
  it('should fail because already exists', async () => {
    await agent.post('/users/signin')
      .send({name: 'Test', email: 'test@test.com', password: 'test'})
      .expect(500)
  })
})

/**
 * 
 *  LOGIN
 * 
 */
describe('User login', () => {
  it('should login', async () => {
    await agent.post('/users/login')
      .send({email: 'test@test.com', password: 'test'})
      .expect(200)
  })
  it('should fail because of missing email', async () => {
    await agent.post('/users/login')
      .send({email: '', password: 'test'})
      .expect(422)
  })
  it('should fail because of missing password', async () => {
    await agent.post('/users/login')
      .send({email: 'test@test.com', password: ''})
      .expect(422)
  })
  it('should not find user', async () => {
    await agent.post('/users/login')
      .send({email: 'test@another.com', password: 'test'})
      .expect(404)
  })
})