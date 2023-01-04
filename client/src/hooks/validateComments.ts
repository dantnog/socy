import PostsApi from '../api/postsApi';
import showToast from './showToast';

export default class ValidateComments{
  static async fetch(comments_id: string) {
    if (!comments_id) return
    const res = await PostsApi.fetchComments(comments_id)
    showToast(res.status, res.message, false)
    return res.data ? res.data[0] : undefined
  }

  static async create(comment: string, post_id: string) {
    if (!comment || !post_id) return
    const res = await PostsApi.createComment(comment, post_id)
    showToast(res.status, res.message, false)
    return res.data ? res.data[0] : undefined
  }

  static async remove(comment_id: string, specific_id: string) {
    if (!comment_id || !specific_id) return
    const res = await PostsApi.deleteComment(comment_id, specific_id)
    showToast(res.status, res.message, false)
    return res.status === 200 ? true : false
  }
}