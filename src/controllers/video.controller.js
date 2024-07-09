import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const allVideos = await Video.aggregate([
    {
      $match: {
        $or: [{ title: { $regex: query, $options: "i" } }],
      },
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        thumbnail: 1,
        title: 1,
        duration: 1,
        owner: 1,
      },
    },
  ]);

  if (allVideos.length < 1) throw new ApiError(500, "No video's available");

  return res
    .status(200)
    .json(new ApiResponse(200, allVideos, "All videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  if (!title || !description)
    throw new ApiError(400, "All fields are required");

  const videoFileLocalPath = req.files?.videoFile[0].path;
  if (!videoFileLocalPath) throw new ApiError(400, "Video file required");

  const thumbnailLocalPath = req.files?.thumbnail[0].path;
  if (!thumbnailLocalPath)
    throw new ApiError(400, "Error occured while uploading thumbnail");

  const videoFile = await uploadOnCloudinary(videoFileLocalPath);
  if (!videoFile)
    throw new ApiError(400, "Error occured while uploading video file");

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  if (!thumbnail) throw new ApiError(400, "Thumbnail is required");

  const video = await Video.create({
    videoFile: videoFile.url,
    thumbnail: thumbnail.url,
    thumbnailPublicId: thumbnail.public_id,
    title,
    description,
    duration: videoFile.duration,
    owner: req.user,
  });

  if (!video)
    throw new ApiError(400, "Something went wrong while publishing a video");

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
  ]);

  if (video.length < 1)
    throw new ApiError(400, "Video with this ID is not available");

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  if (!videoId) throw new ApiError(400, "Video Id is missing");

  const { title, description } = req.body;

  const thumbnailLocalPath = req.file?.path;

  if (!title && !description && !thumbnailLocalPath)
    throw new ApiError(400, "Update fields are empty");

  const currentVideo = await Video.findById(
    new mongoose.Types.ObjectId(videoId)
  );

  if (!currentVideo) {
    console.log("Video not found");
    return;
  }

  let updateDoc = {};
  if (title && title !== currentVideo.title) {
    updateDoc.title = title;
  }

  if (description && description !== currentVideo.description) {
    updateDoc.description = description;
  }

  if (thumbnailLocalPath) {
    await deleteFromCloudinary(currentVideo.thumbnailPublicId);
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    if (!thumbnail.url)
      throw new ApiError(400, "Error while uploading thumbnail");
    updateDoc.thumbnail = thumbnail.url;
    updateDoc.thumbnailPublicId = thumbnail.public_id;
  }

  if (Object.keys(updateDoc).length > 0) {
    const updatedVideo = await Video.findByIdAndUpdate(
      new mongoose.Types.ObjectId(videoId),
      { $set: updateDoc },
      { new: true }
    );

    res
      .status(200)
      .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
  } else {
    throw new ApiError(400, "No changes detected");
  }
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video

  if (!videoId) throw new ApiError(400, "Video Id is missing");

  await Video.findByIdAndDelete(videoId);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) throw new ApiError(400, "Video Id is missing");

  const video = await Video.findById(videoId);

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: { isPublished: !video.isPublished },
    },
    { new: true }
  );

  if (!video)
    throw new ApiError(
      400,
      "Something went wrong while changing the video status"
    );

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideo, "Video status changed successfully")
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
