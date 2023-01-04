import UsersApi from "../api/usersApi";
import showToast from "./showToast";

export default class validateFollowings {
  static async fetch(followlist_id: string) {
    const res = await UsersApi.fetchFollowing(followlist_id)
    showToast(res.status, res.message, false)
    return res.data[0].followedUser
  }

  static async set(idToFollow: string) {
    const res = await UsersApi.setFollow(idToFollow)
    showToast(res.status, res.message, false)
    return res.data[0].followinglist[0].list
  }
}