import axios from "axios";
import qs from "qs";
import graniteData from "@/data/data.json";

const IBM_API_KEY = "Oj36pukErzi6fFvZJeR6Jpz7v5u7JY-9oZyvDrqE5qkE";
const IBM_PROJECT_ID = "cf14ff7c-6d7d-4cdb-b009-670f8020f8f7";

const IBM_MODEL_ID = "ibm/granite-13b-instruct-v2";
const REGION = "us-south";

export const getAccessToken = async () => {
  try {
    // const data = qs.stringify({
    //   grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    //   apikey: IBM_API_KEY,
    // });

    // const response = await axios.post(
    //   "https://iam.cloud.ibm.com/identity/token",
    //   data,
    //   {
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   }
    // );

    const response = await axios.get(
      "http://127.0.0.1:5001/email-summary-69414/us-central1/getAccessTokenIBM",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    return null;
  }
};

export const getGraniteFormat = () => {
  //   const prompt = fs.readFileSync("./prompt.txt", "utf-8");
  //   const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

  //   const data = JSON.parse(graniteData);

  const response = graniteData;
  //   response.input = prompt;
  return response;
};

export const askGranite = async (data, accessToken) => {
  console.log(data);
  try {
    const response = await axios.post(
      "http://127.0.0.1:5001/email-summary-69414/us-central1/askGranite",
      { data, token: accessToken },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const response = await axios.post(
    //   `https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29`,
    //   {
    //     model_id: IBM_MODEL_ID,
    //     input: data.input,
    //     parameters: data.parameters,
    //     project_id: IBM_PROJECT_ID,
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );
    console.log(response);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getJiraVersionList = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:5001/email-summary-69414/us-central1/askGraniteJiraSummary",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

// for email summary 
export async function processEmailsWithGranite(emails, prompt) {
    console.log("called processEmailsWithGranite");
    const url = "https://proxyforibm-88138015277.us-central1.run.app"; // replace with your Cloud Function URL
  
    console.log("Emails:", emails);
    console.log("Prompt:", prompt);
  
    try {
      const response = await axios.post(
        url,
        {
          emails: emails,
          prompt: prompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      response.data = response.data || {};
      console.log("Response from function:", response.data);
      console.log("Generated Text:", response.data.result.results[0].generated_text);
      return response.data.result.results[0].generated_text; // You can process the response as needed
    } catch (error) {
      console.error("Error calling function:", error.message);
      throw new Error("Failed to call Cloud Function");
    }
  }


//   Jira API


