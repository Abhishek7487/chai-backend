import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  const isSubscribed = await Subscription.findOne({
    subscriber: req.user._id,
    channel: channelId,
  });

  if (!isValidObjectId(channelId))
    throw new ApiError(400, "Invalid channel id");

  const currentChannel = await User.findById(channelId);

  if (!currentChannel) throw new ApiError(404, "Channel not found");

  if (!isSubscribed) {
    const subscription = await Subscription.create({
      subscriber: req.user,
      channel: currentChannel,
    });

    if (!subscription)
      throw new ApiError(400, "Failed to subscribe the channel");

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          subscription,
          "Successfully subscribed to the subscription"
        )
      );
  } else {
    await Subscription.deleteOne({
      subscriber: req.user,
      channel: currentChannel,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, {}, "Successfully unsubscribed to the channel")
      );
  }
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId))
    throw new ApiError(400, "Invalid channel id");

  const currentChannel = await User.findById(channelId);

  if (!currentChannel) throw new ApiError(404, "Channel not found");

  const subscribersList = await Subscription.aggregate([
    {
      $match: {
        channel: currentChannel._id,
      },
    },
    {
      $project: {
        _id: 1,
        subscriber: 1,
      },
    },
  ]);

  if (subscribersList.length === 0) {
    res
      .status(200)
      .json(new ApiResponse(200, subscribersList, "No sucscribers"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribersList,
        "Channel's subscribers fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId: subscriberId } = req.params;

  if (!isValidObjectId(subscriberId))
    throw new ApiError(400, "Invalid channel id");

  const subscribedCahnnelList = await Subscription.aggregate([
    {
      $match: {
        subscriber: new mongoose.Types.ObjectId(subscriberId),
      },
    },
    {
      $project: {
        _id: 1,
        channel: 1,
      },
    },
  ]);

  if (subscribedCahnnelList.length === 0) {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          subscribedCahnnelList,
          "You have not subscribed to anyone"
        )
      );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribedCahnnelList,
        "Subscribed channels fetched successfully"
      )
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
