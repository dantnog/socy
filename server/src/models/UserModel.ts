import mongoose from '../db/conn'

const schema = new mongoose.Schema({
  name: {type: String, required: true, min: 2, max: 60},
  description: {type: String, min: 2, max: 60},
  location: {type: String, min: 2, max: 60},
  email: {type: String, required: true, unique: true, max: 60},
  password: {type: String, required: true},
  picture: {type: String, default: ''},
  followlist_id: {type: mongoose.Types.ObjectId, require: false},
  likeslist_id: {type: mongoose.Types.ObjectId, require: false}
},
{
  timestamps: true
})

const User = mongoose.model('User', schema)

export default User