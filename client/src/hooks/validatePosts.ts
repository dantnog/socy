import PostsApi from "../api/postsApi";
import showToast from "./showToast";

export default class ValidatePosts {
  static async fetchAll() {
    const res = await PostsApi.fetchAllPosts()
    showToast(res.status, res.message, false)
    return res.data ? res.data : undefined
  }

  static async fetchPersonal() {
    const res = await PostsApi.fetchPersonalPosts()
    showToast(res.status, res.message, false)
    return res.data ? res.data : undefined
  }

  static async create(message: string) {
    if (!message.trim()) return
    const res = await PostsApi.createPost(message)
    showToast(res.status, res.message, false)
    return res.data ? true : false
  }

  static async delete(idToDelete: string) {
    const res = await PostsApi.deletePost(idToDelete)
    showToast(res.status, res.message, false)
    return res ? true : false
  }
}