import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true }, // Linking to Video
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },   // Linking to User
    userName: { type: String  },    
    text: { type: String, required: true },         
    createdAt: { type: Date, default: Date.now },  
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
