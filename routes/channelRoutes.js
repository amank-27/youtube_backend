import { createChannel, getChannel } from "../controllers/channelController.js";
import { verifyToken } from "../middlewares/verify.js"; 

// Define the channel routes
export function channelRoutes(app) {
  
  app.post("/channels", verifyToken, createChannel);

  app.get("/channels/:channelId", getChannel);
}
