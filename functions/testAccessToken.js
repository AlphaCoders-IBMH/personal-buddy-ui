const {getAccessToken} = require("./index");

(async () => {
  try {
    console.log("Fetching access token...");
    const token = await getAccessToken();
    console.log("Access token retrieved:", token);
  } catch (error) {
    console.error("Error fetching access token:", error.message);
  }
})();
