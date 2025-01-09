import { addComment, getComments,getAllComments,editComment,deleteComment } from '../controllers/commentController.js';
import { verifyToken } from '../middlewares/verify.js';  // Assuming verifyToken is already implemented

export function commentRoutes(app){

app.post('/comments', verifyToken, addComment);
app.get('/comments/:videoId', getComments);
app.get('/comments', getAllComments);
app.put('/comments/:commentId', verifyToken, editComment);
app.delete('/comments/:commentId', verifyToken, deleteComment);
}



