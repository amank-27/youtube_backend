import Video from "../models/videoModel.js";
import Channel from "../models/channelModel.js";

// function to get all videos
export async function getVideos(req, res) {
    try {
        const videos = await Video.find();
        res.status(200).json(videos); // Send the videos as a response in JSON format
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
    }
}
//  create a video inside a channel
export async function createVideo(req, res) {
    const { title, url, thumbnail, description, genre } = req.body;
    const { channelId } = req.params; 
try {
     // Check if the channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
         return res.status(404).json({ message: 'Channel not found' });
     }
 // Create the video
     const newVideo = new Video({
         videoId: `video_${Date.now()}`, 
         url,
         title,
         thumbnail,
         description,
         genre,
         channelId, 
         uploader: req.user.userId, 
         uploadDate: new Date().toISOString()
        });

        // Save the video
        await newVideo.save();
        res.status(201).json({ message: 'Video created successfully', video: newVideo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
// PUT: Update a video inside a channel
export async function updateVideo(req, res) {
    const { videoId, channelId } = req.params; // Extract videoId and channelId from URL params
    const { title, url, thumbnail, description, genre } = req.body;
try {
    // Check if the channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
         return res.status(404).json({ message: 'Channel not found' });
      }
// Find the video by videoId and channelId
     const video = await Video.findOne({ _id: videoId, channelId });
    if (!video) {
          return res.status(404).json({ message: 'Video not found in this channel' });
     }
// Update the video fields
 video.title = title || video.title;
 video.url = url || video.url;
 video.thumbnail = thumbnail || video.thumbnail;
 video.description = description || video.description;
 video.genre = genre || video.genre;

        // Save the updated video
        await video.save();
        res.status(200).json({ message: 'Video updated successfully', video });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// DELETE: Delete a video inside a channel
export async function deleteVideo(req, res) {
    const { videoId, channelId } = req.params; // Extract videoId and channelId from URL params

    try {
        // Check if the channel exists
        const channel = await Channel.findById(channelId);
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Find and delete the video
        const video = await Video.findOneAndDelete({ _id: videoId, channelId });
        if (!video) {
            return res.status(404).json({ message: 'Video not found in this channel' });
        }

        res.status(200).json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}