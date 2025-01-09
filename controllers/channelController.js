import Channel from "../models/channelModel.js";

// Creating a new channel (only login users can create)
export async function createChannel(req, res) {
  const { channelId, channelName, description, channelBanner, subscribers, videos } = req.body;

  try {
    // Get the login user from the JWT token
    const owner = req.user.userId; 

    // Check if the channel already exists
    const existingChannel = await Channel.findOne({ channelId });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel already exists" });
    }

    // Create a new channel
    const newChannel = new Channel({
      channelId,
      channelName,
      owner, // automatically set the logged-in user's ID as the owner
      description,
      channelBanner,
      subscribers,
      videos
    });

    // Save the new channel to the database
    await newChannel.save();

    return res.status(201).json({ message: "Channel created successfully", newChannel });
  } catch (error) {
    console.error("Error creating channel:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get a channel
export async function getChannel(req, res) {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findOne({ channelId }).populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    return res.status(200).json(channel);
  } catch (error) {
    console.error("Error fetching channel:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
