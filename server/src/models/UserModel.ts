import mongoose from '../db/conn'

const schema = new mongoose.Schema({
  name: {type: String, required: true, min: 2, max: 60},
  description: {type: String, required: true, min: 2, max: 60},
  location: {type: String, required: true, min: 2, max: 60},
  email: {type: String, required: true, unique: true, max: 60},
  password: {type: String, required: true},
  picture: {type: String, default: ''},
},
{
  timestamps: true
})

const User = mongoose.model('User', schema)

export default User