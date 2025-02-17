const hasVideoFile = (files) => {
  return files.some((file) => file.type.startsWith("video"));
};

// Function to check what media types are required
export const getMediaWarning = (postList, files) => {
  const platformsRequiringMedia = ["instagram", "tiktok", "pinterest", "gmb"];
  const presentPlatforms = platformsRequiringMedia
    .filter((platform) => postList.includes(platform))
    .map((platform) =>
      platform === "gmb" ? "Google Business Profile" : platform
    );

  const warnings = [];
  if (presentPlatforms.length > 0 && files.length === 0) {
    warnings.push(`Media required for ${presentPlatforms.join(", ")}.`);
  }

  if (postList.includes("youtube") && !hasVideoFile(files)) {
    warnings.push("Video required for YouTube.");
  }

  return warnings;
};
