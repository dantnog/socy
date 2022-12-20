import mongoose from '../db/conn'

const schema = new mongoose.Schema({
  post_id: {type: mongoose.Types.ObjectId, required: true},
  comments: {
    type: [{
      user_id: {type: mongoose.Types.ObjectId, required: true},
      comment: {type: String, required: true}
    }],
    default: []
  }
},
{
  timestamps: true
})

const Comment = mongoose.model('Comment', schema)

export default Comment