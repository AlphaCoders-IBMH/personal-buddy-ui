const axios = require("axios");
const qs = require("qs");

(async () => {
    const IBM_API_KEY = "6Zdjf_EuSukdgjcinncuhe_coEAaJ5nL2z4pCHm6NuQ7";
    const data = qs.stringify({
            grant_type: "urn:ibm:params:oauth:grant-type:apikey",
            apikey: IBM_API_KEY,
          });
  try {
    const response = await axios.post("http://localhost:5001/email-summary-69414/us-central1/proxyToIBM", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("Response from proxyToIBM:", response.data);
  } catch (error) {
    console.error("Error testing proxyToIBM:", error);
  }
})();
