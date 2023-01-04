import LoginProps from '../types/LoginProps';
import SignupProps from '../types/SignupProps';
import UpdateProps from '../types/UpdateProps';
import { getRequest, postRequest, patchRequest, deleteRequest, handleResponse } from './requests';

export default class UsersApi {
  static async signup({name, email, password, image}: SignupProps) {
    // FormData is needed to send files
    let fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    fd.append('password', password)
    image ? fd.append('image', image) : null

    const response = postRequest('/users/signup', fd, true)
    return await handleResponse(response)
  }

  static async login({email, password}: LoginProps) {
    const response = postRequest('/users/login', {email, password})
    return await handleResponse(response)
  }

  static async updateUser({name, description, location, password, image}: UpdateProps) {
    // FormData is needed to send files
    let fd = new FormData()
    name ? fd.append('name', name) : null
    description ? fd.append('description', description) : null
    location ? fd.append('location', location) : null
    password ? fd.append('password', password) : null
    image ? fd.append('image', image) : null

    const response = patchRequest('/users/update', fd, true)
    return await handleResponse(response)
  }

  static async deleteUser() {
    const response = deleteRequest('/users/delete')
    return await handleResponse(response)
  }

  static async logoutUser() {
    const response = getRequest('/users/logout')
    return await handleResponse(response)
  }

  static async setFollow(idToFollow: string) {
    const response = postRequest('/users/setfollowing', {idToFollow})
    return await handleResponse(response)
  }

  static async fetchFollowing(followlist_id: string) {
    const response = postRequest('/users/fetchfollowing', {followlist_id})
    return await handleResponse(response)
  }

  static async fetchProfileData(id: string) {
    const response = getRequest(`/users/profile/${id}`)
    return await handleResponse(response)
  }

  static async searchUser(name: string) {
    const response = postRequest('/users/search', {name})
    return await handleResponse(response)
  }
}