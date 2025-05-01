import axios from "axios";
import qs from "qs";

/**
 * Sends a list of emails to the IBM Granite Model for summarization or custom prompt processing.
 * @param {Array} emails - List of email objects to process.
 * @param {string} prompt - Custom prompt to run against the emails.
 * @returns {Promise<string>} - The response from the Granite Model.
 */
export async function processEmailsWithGranite(emails, prompt) {

  console.log("Processing emails with Granite...");
    const IBM_API_KEY = "Oj36pukErzi6fFvZJeR6Jpz7v5u7JY-9oZyvDrqE5qkE"; // Keep secret in production
    //const IBM_PROJECT_ID = "4ba352d5-9e86-4535-8cb3-aa874e556aa6";
    const IBM_PROJECT_ID = "cf14ff7c-6d7d-4cdb-b009-670f8020f8f7";

    try {
      const accessToken = await getAccessToken();
      console.log("Access token retrieved successfully.");
      console.log("Access Token:", accessToken);
  
      const response = await axios.post(
        `https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
        {
          model_id: IBM_MODEL_ID,
          input: {
            emails,
            prompt,
          },
          parameters: {
            decoding_method: "greedy",
            max_new_tokens: 100,
          },
          project_id: IBM_PROJECT_ID,
        },
        {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );
  
      return response.data.summary; 
    } catch (error) {
      console.error("Error processing emails with Granite:", error);
      throw error;

    }

    async function getAccessToken() {
      const data = qs.stringify({
        grant_type: "urn:ibm:params:oauth:grant-type:apikey",
        apikey: IBM_API_KEY,
      });
    
      const response = await axios.post("https://iam.cloud.ibm.com/identity/token", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    
      return response.data.access_token;
    }


}