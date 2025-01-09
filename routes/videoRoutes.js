import { getVideos,createVideo,updateVideo,deleteVideo } from "../controllers/videoController.js";
import { verifyToken } from "../middlewares/verify.js";

export function videoRoutes(app){
    app.get("/videos",getVideos);

    //  Create a new video in a channel
app.post('/channel/:channelId/videos', verifyToken, createVideo);

// Update a video inside a channel
app.put('/channel/:channelId/videos/:videoId', verifyToken, updateVideo);

//  Delete a video inside a channel
app.delete('/channel/:channelId/videos/:videoId', verifyToken, deleteVideo);
}