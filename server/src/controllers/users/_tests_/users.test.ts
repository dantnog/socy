import request from 'supertest'
import { describe, it } from 'vitest'
import { app } from '../../../index'


const agent = request.agent(app)

let idFirst: string
let listId: string


/**
 * 
 *  WITHOUT TOKEN
 * 
 */
describe('Perform actions without token', () => {
  it('should fail', async () => {
    await agent.patch('/users/update')
      .send({name: 'newTest'})
      .expect(401)
  })
  it('should fail', async () => {
    await agent.delete('/users/delete')
      .expect(401)
  })
})

/**
 * 
 *  WRONG TOKEN
 *  ERROR: jwt is making it fail
 */
/* describe('Perform actions with wrong token', () => {
  it('should fail', async () => {
    await agent.patch('/users/update')
      .send({name: 'newTest'})
      .set('Cookie', ['jwt=n'])
      .expect(401)
  })
  it('should fail', async () => {
    await agent.delete('/users/delete')
      .set('Cookie', 'jwt=n')
      .expect(401)
  })
})*/

/**
 * 
 *  SIGN IN
 * 
 */
describe('User signup', () => {
  it('should create the user', async () => {
    await agent.post('/users/signup')
      .send({name: 'Test', email: 'test@test.com', password: 'test'})
      .expect(201)
  })
  it('should fail because of missing name', async () => {
    await agent.post('/users/signup')
      .send({name: '', email: 'test@test.com', password: 'test'})
      .expect(422)
  })
  it('should fail because of missing email', async () => {
    await agent.post('/users/signup')
      .send({name: 'Test', email: '', password: 'test'})
      .expect(422)
  })
  it('should fail because of missing password', async () => {
    await agent.post('/users/signup')
      .send({name: 'Test', email: 'test@test.com', password: ''})
      .expect(422)
  })
  it('should fail because already exists', async () => {
    await agent.post('/users/signup')
      .send({name: 'Test', email: 'test@test.com', password: 'test'})
      .expect(400)
  })
})

/**
 * 
 *  LOGIN
 * 
 */
describe('User login', () => {
  it('should login', async () => {
    const res = await agent.post('/users/login')
      .send({email: 'test@test.com', password: 'test'})
      .expect(200)

    idFirst = res.body.data[0]._id
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

/**
 * 
 *  UPDATE
 * 
 */
describe('User update', () => {
  it('should update name', async () => {
    await agent.patch('/users/update')
      .send({name: 'Test1'})
      .expect(200)
  })
  it('should update description', async () => {
    await agent.patch('/users/update')
      .send({description: 'Anything here'})
      .expect(200)
  })
  it('should update location', async () => {
    await agent.patch('/users/update')
      .send({location: 'Anywhere far away'})
      .expect(200)
  })
  it('should update password', async () => {
    await agent.patch('/users/update')
      .send({password: 'test1'})
      .expect(200)
  })
})

/**
 * 
 *  SEARCH
 * 
 */
describe('User search', () => {
  it('should complete the search', async () => {
    await agent.post('/users/search')
      .send({name: 'Test1'})
      .expect(200)
  })
  it('should failed because of missing name', async () => {
    await agent.post('/users/search')
      .send({name: ''})
      .expect(422)
  })
})

/**
 * 
 *  SET FOLLOWING
 * 
 */
describe('Follow other user', () => {
  it('should create a second user to the following tests', async () => {
    await agent.post('/users/signup')
      .send({name: 'Test2', email: 'test2@test.com', password: 'test'})
      .expect(201)
  })
  it('should sucessfully follow other', async () => {
    let res = await agent.post('/users/setfollowing')
      .send({idToFollow: idFirst})
      .expect(200)

    listId = res.body.data[0].followlist_id 
  })
  it('should sucessfully unfollow other', async () => {
    await agent.post('/users/setfollowing')
      .send({idToFollow: idFirst})
      .expect(200)
  })
  it('should failed because of missing id', async () => {
    await agent.post('/users/setfollowing')
      .send({idToFollow: ''})
      .expect(422)
  })
})

/**
 * 
 *  FETCH FOLLOWING LIST
 * 
 */
describe('Fetch the users been followed', () => {
  it('should sucessfully fetch the list', async () => {
    await agent.post('/users/fetchfollowing')
      .send({followlist_id: listId})
      .expect(200)
  })
  it('should failed because of missing id', async () => {
    await agent.post('/users/fetchfollowing')
      .send({followlist_id: ''})
      .expect(422)
  })
})

/**
 * 
 *  DELETE ACCOUNT
 * 
 */
describe('User delete', () => {
  it('should delete the first user', async () => {
    await agent.delete('/users/delete')
      .expect(200)
  })
  it('should login the second user to then delete', async () => {
    const res = await agent.post('/users/login')
      .send({email: 'test@test.com', password: 'test1'})
      .expect(200)
  })
  it('should delete the second user', async () => {
    await agent.delete('/users/delete')
      .expect(200)
  })
})