import mongoose from '../db/conn'

const schema = new mongoose.Schema({
  message: {type: String, required: true, min: 1, max: 200},
  user_id: {type: mongoose.Types.ObjectId, required: true},
  likes: {type: Array, default: []},
  likesCount: {type: Number, default: 0},
  comments_id: {type: mongoose.Types.ObjectId},
  commentsCount: {type: Number, default: 0}
},
{
  timestamps: true
})

const Post = mongoose.model('Post', schema)

export default Post
