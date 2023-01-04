import UsersApi from "../api/usersApi"
import LoginProps from "../types/LoginProps"
import SignupProps from "../types/SignupProps"
import UpdateProps from "../types/UpdateProps"
import showToast from "./showToast"

export default class ValidateAuth {
  static async login({email, password}: LoginProps) {
    if (!email.trim()) return showToast(0, "Don't forget the email")
    if (!password.trim()) return showToast(0, "Don't forget the password")

    const res = await UsersApi.login({email, password})
    showToast(res.status, res.message)
    return res.data ? res.data : undefined
  }

  static async signup({name, email, password, confirm, image}: SignupProps) {
    if (!name.trim()) return showToast(0, "Don't forget the name")
    if (!email.trim()) return showToast(0, "Don't forget the email")
    if (!password.trim()) return showToast(0, "Don't forget the password")
    if (!confirm?.trim()) return showToast(0, "Don't forget the confirmation")
    if (password !== confirm) return showToast(0, "The passwords doesn't matches")

    const res = await UsersApi.signup({name, email, password, image})
    showToast(res.status, res.message)
    return res.data ? res.data : undefined
  }

  static async update({name, description, location, password, confirm, image}: UpdateProps) {
    if (!name && !description && !location && !password && !image) return
    if (password && (password !== confirm)) return showToast(0, "The passwords doesn't matches")

    const res = await UsersApi.updateUser({name, description, location, password, image})
    showToast(res.status, res.message)
    return res.data ? res.data : undefined
  }

  static async delete() {
    const res = await UsersApi.deleteUser()
    showToast(res.status, res.message)
    return res.status == 200 ? true : false
  }

  static async logout() {
    const res = await UsersApi.logoutUser()
    showToast(res.status, res.message)
    return res.status == 200 ? true : false
  }

  static async fetchProfileData(id: string) {
    const res = await UsersApi.fetchProfileData(id)
    showToast(res.status, res.message)
	  return res.data
  }
}