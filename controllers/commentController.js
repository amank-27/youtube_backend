import Comment from '../models/commentModel.js';
import Video from '../models/videoModel.js';
import User from '../models/userModel.js';

// add comment function
export async function addComment(req, res) {
    const { videoId, text } = req.body;

try {
    // Validate the request data
 if (!videoId || !text) {
     return res.status(400).json({ message: 'Video ID and comment text are required' });
    }
    // Check if the video exists
const video = await Video.findById(videoId);
 if (!video) {
     return res.status(404).json({ message: 'Video not found' });
     }
// Get the authenticated user (via JWT)
 const userId = req.user.userId;
const user = await User.findById(userId);
if (!user) {
    return res.status(404).json({ message: 'User not found' });
 }
 // Creating the comment
 const newComment = new Comment({
    videoId,
    userId: user._id,
    userName: user.username,
    text,
     });
// Save the comment to the database
 await newComment.save();
   res.status(201).json({ message: 'Comment added successfully', newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get all comments for a specific video
export async function getComments(req, res) {
    const { videoId } = req.params; // getting videoId from URL parameters
  try {
     // Fetch comments for the specific video
     const comments = await Comment.find({ videoId }).populate('userId', 'username'); // Populating userName field
     if (comments.length === 0) {
         return res.status(404).json({ message: 'No comments found for this video' });
    }
 res.status(200).json({ comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Editing an existing comment
export async function editComment(req, res) {
    const { commentId } = req.params; // Get commentId from URL parameters
    const { text } = req.body;  // Get new comment text from the body
try {
// Find the comment by ID
const comment = await Comment.findById(commentId);
   if (!comment) {
     return res.status(404).json({ message: 'Comment not found' });
 }
  // Ensure the logged-in user is the one who made the comment
 if (comment.userId.toString() !== req.user.userId) {
    return res.status(403).json({ message: 'You are not authorized to edit this comment' });
 }
// Update the comment text
  comment.text = text || comment.text;
  await comment.save();
   res.status(200).json({ message: 'Comment updated successfully', updatedComment: comment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// Get all comments from the database 
export async function getAllComments(req, res) {
try {
 const comments = await Comment.find().populate('userId', 'username').populate('videoId', 'title');
     if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found in the database' });
    }
 res.status(200).json({ comments });
} catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Internal server error' });
 }
}
// Delete a comment using findByIdAndDelete
export async function deleteComment(req, res) {
 const { commentId } = req.params;
  try {
   const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
     // Check if the logged-in user is the one who made the comment
        if (deletedComment.userId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this comment' });
        }
       res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}