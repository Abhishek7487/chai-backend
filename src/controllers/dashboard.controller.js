import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const totalVideoViews = await Video.aggregate([
    {
      $match: {
        owner: req.user._id,
      },
    },
    {
      $group: { _id: null, totalViews: { $sum: "$views" } },
    },
  ]);

  const totalSubscribers = await Subscription.countDocuments({
    channel: req.user._id,
  });

  const totalVideos = await Video.countDocuments({ owner: req.user._id });

  const totalLikes = await Like.countDocuments(
    { video: { $exists: true } },
    { video: { owner: req.user._id } }
  );

  res.status(200).json(
    new ApiResponse(
      200,
      {
        totalSubscribers,
        totalVideos,
        totalLikes,
        totalVideoViews: totalVideoViews[0].totalViews,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const channelVideos = await Video.find({ owner: req.user._id });

  res
    .status(200)
    .json(
      new ApiResponse(200, channelVideos, "Channel videos fetched successfully")
    );
});

export { getChannelStats, getChannelVideos };
