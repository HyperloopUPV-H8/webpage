const CHANNEL_NAME = "vegetta777";

export async function isHyperloopUPVOnline(): Promise<boolean> {
  try {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://twitch.tv/${CHANNEL_NAME}`);
    const sourceCode = await response.text();

    if (sourceCode.includes("isLiveBroadcast")) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return false;
  }
}
