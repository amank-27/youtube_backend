import mongoose from "mongoose";

const videoSchema = mongoose.Schema({
    videoId: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    uploadDate: { type: String,},
    genre: { type: String },
    channelId: { type: String, required: true },
    uploader: { type: String, required: true }
});

// Create a video model
const Video = mongoose.model("Video", videoSchema);

export default Video;
