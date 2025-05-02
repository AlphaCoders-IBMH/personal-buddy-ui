import axios from "axios";
import qs from "qs";
//const { getAccessToken } = require("./functions/index");
import callProxyToIBM from "./firebaseConfig";

/**
 * Sends a list of emails to the IBM Granite Model for summarization or custom prompt processing.
 * @param {Array} emails - List of email objects to process.
 * @param {string} prompt - Custom prompt to run against the emails.
 * @returns {Promise<string>} - The response from the Granite Model.
 */
export async function processEmailsWithGranite(emails, prompt) {

  console.log("Processing emails with Granite...");
    const IBM_MODEL_ID = "ibm/granite-13b-instruct-v2";
    const IBM_API_KEY = "Oj36pukErzi6fFvZJeR6Jpz7v5u7JY-9oZyvDrqE5qkE"; // Keep secret in production
    //const IBM_PROJECT_ID = "4ba352d5-9e86-4535-8cb3-aa874e556aa6";
    const IBM_PROJECT_ID = "cf14ff7c-6d7d-4cdb-b009-670f8020f8f7";
    
    // async function getAccessToken() {
    //   const data = qs.stringify({
    //     grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    //     apikey: IBM_API_KEY,
    //   });
    
    //   const response = await axios.post("https://us-central1-email-summary-69414.cloudfunctions.net/proxyToIBM", data, {
    //     headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //   });
    // console.log("Response from proxyToIBM:", response.data);
    //   return response.data.access_token;
    // }


    const handleFunctionCall = async () => {
      await callProxyToIBM();
    };

    try {
      const accessToken1 = await handleFunctionCall();
      const accessToken = "eyJraWQiOiIyMDI1MDQzMDA4NDUiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJJQk1pZC02OTQwMDBVUUZTIiwiaWQiOiJJQk1pZC02OTQwMDBVUUZTIiwicmVhbG1pZCI6IklCTWlkIiwianRpIjoiNDg5ZDY0MzgtOWYxYS00ODFkLTg2NjItMzRiMjBkMzkwMmEwIiwiaWRlbnRpZmllciI6IjY5NDAwMFVRRlMiLCJnaXZlbl9uYW1lIjoiUmFnaGF2ZW5kcmEiLCJmYW1pbHlfbmFtZSI6IkJvZGR1cGFsbGkiLCJuYW1lIjoiUmFnaGF2ZW5kcmEgQm9kZHVwYWxsaSIsImVtYWlsIjoicmFnaGF2ZW5kcmEuYm9kZHVwYWxsaUBtb3JnYW5zdGFubGV5LmNvbSIsInN1YiI6InJhZ2hhdmVuZHJhLmJvZGR1cGFsbGlAbW9yZ2Fuc3RhbmxleS5jb20iLCJhdXRobiI6eyJzdWIiOiJyYWdoYXZlbmRyYS5ib2RkdXBhbGxpQG1vcmdhbnN0YW5sZXkuY29tIiwiaWFtX2lkIjoiSUJNaWQtNjk0MDAwVVFGUyIsIm5hbWUiOiJSYWdoYXZlbmRyYSBCb2RkdXBhbGxpIiwiZ2l2ZW5fbmFtZSI6IlJhZ2hhdmVuZHJhIiwiZmFtaWx5X25hbWUiOiJCb2RkdXBhbGxpIiwiZW1haWwiOiJyYWdoYXZlbmRyYS5ib2RkdXBhbGxpQG1vcmdhbnN0YW5sZXkuY29tIn0sImFjY291bnQiOnsidmFsaWQiOnRydWUsImJzcyI6ImY4YWM4YWNiN2UxNjRiMDQ5OTQ4MmJmYzBlNWZlYWEyIiwiaW1zX3VzZXJfaWQiOiIxMzYwMDE5MyIsImZyb3plbiI6dHJ1ZSwiaW1zIjoiMjk5NjI1NCJ9LCJpYXQiOjE3NDYxMjExMjUsImV4cCI6MTc0NjEyNDcyNSwiaXNzIjoiaHR0cHM6Ly9pYW0uY2xvdWQuaWJtLmNvbS9pZGVudGl0eSIsImdyYW50X3R5cGUiOiJ1cm46aWJtOnBhcmFtczpvYXV0aDpncmFudC10eXBlOmFwaWtleSIsInNjb3BlIjoiaWJtIG9wZW5pZCIsImNsaWVudF9pZCI6ImRlZmF1bHQiLCJhY3IiOjEsImFtciI6WyJwd2QiXX0.AFUW3_aWWg2MY4mx9kFjYTxkevXhLYfEmpLvtF--CH1mEKMrH6Rv8bx9S6KCMcMG9PxiKYfyL8EWOYjkIhYrQ8UGvOUctA8T_2-iy23-k6QSNv6fKVArN7UKkVoq85y-n-IMTZ61stsbr2UKRYUhRLe3ml60Yu6vnHfzedsp529z0yjcHPwHl6AKlwIOSWr34oWpgFnpDMAeVjoev7DKA1qGtE6kU2_K89yrelhrmObHkG9-2sLsP3h8CTpEoNLnuUqPZgM79j8e15NAHceIDDlVAGTFw_vP1ee2tnX8AIQREBJ0gWQSZ2BwAATufPWLrd8qH8Y418jcfahBUKU88Q"
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
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
  
      return response.data.summary;
    } catch (error) {
      console.error("Error in Granite API call:", error.message);
      throw new Error("Failed to process emails with Granite API. Please check the logs for more details.");
    }

    
    

}