function formReducer(state: any, action: any) {
  switch (action.type) {
    case 'name':
      return {...state, name: action.payload}
    case 'email':
      return {...state, email: action.payload}
    case 'password':
      return {...state, password: action.payload}
    case 'confirm':
      return {...state, confirm: action.payload}
    case 'description':
      return {...state, description: action.payload}
    case 'location':
      return {...state, location: action.payload}
    case 'image':
      return {...state, image: action.payload}
    case 'clear':
      return {name: '', email: '', password: '', confirm: '', description: '',
        location: '', image: undefined}
    default:
      return state
  }
}

export default formReducer