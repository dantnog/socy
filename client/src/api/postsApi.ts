import { getRequest, postRequest, deleteRequest, handleResponse } from './requests';

export default class PostsApi {
  static async createPost(message: string) {
    const response = postRequest('/posts/create', {message})
    return await handleResponse(response)
  }

  static async deletePost(idToDelete: string) {
    const response = deleteRequest(`/posts/delete/${idToDelete}`)
    return await handleResponse(response)
  }

  static async fetchAllPosts() {
    const response = getRequest('/posts/all')
    return await handleResponse(response)
  }

  static async fetchPersonalPosts() {
    const response = getRequest('/posts/personal')
    return await handleResponse(response)
  }

  static async createComment(comment: string, post_id: string) {
    const response = postRequest('/posts/comments', {comment, post_id})
    return await handleResponse(response)
  }

  static async deleteComment(comment_id: string, specific_id: string) {
    const response = deleteRequest(`/posts/comments/${comment_id}/${specific_id}`)
    return await handleResponse(response)
  }

  static async fetchComments(comments_id: string) {
    const response = getRequest(`/posts/comments/${comments_id}`)
    return await handleResponse(response)
  }

  static async setLike(idToLike: string) {
    const response = postRequest('/posts/setlike', {idToLike})
    return await handleResponse(response)
  }
}