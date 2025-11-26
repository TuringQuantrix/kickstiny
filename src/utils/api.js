export async function fetchChannelInfo(username) {
  const response = await fetch(
    `https://kick.com/api/v2/channels/${username}/info`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch channel info: ${response.status}`);
  }

  return await response.json();
}

export async function fetchViewerCount(livestreamId) {
  const response = await fetch(
    `https://kick.com/current-viewers?ids[]=${livestreamId}`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch viewer count: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data) && data.length > 0 && data[0].viewers !== undefined) {
    return data[0].viewers;
  }

  return null;
}
