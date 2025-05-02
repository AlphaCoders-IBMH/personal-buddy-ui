const axios = require("axios");
const qs = require("qs");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();

const corsHandler = cors({origin: true});

exports.proxyToIBM = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
    const IBM_API_KEY = "6Zdjf_EuSukdgjcinncuhe_coEAaJ5nL2z4pCHm6NuQ7";

    const data = qs.stringify({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: IBM_API_KEY,
      });

    try {
      const response = await axios.post("https://iam.cloud.ibm.com/identity/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error("Error in proxy:", error.message);
      res.status(500).json({error: "Failed to fetch token"});
    }
  });
});
