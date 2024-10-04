import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
//const API_URL = "https://secrets-api.appbrewery.com/";

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = "silvia";
const yourPassword = "silvia";
const yourAPIKey = "4564647f-d565-4bc9-9c69-6da735d671de";
const yourBearerToken = "bd0044e1-7b72-4b70-905a-2d322f887e34";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get("https://secrets-api.appbrewery.com/random");
    const content = JSON.stringify(response.data);
    res.render("index.ejs", { content: content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 2: Use axios to hit up the /random endpoint
  //The data you get back should be sent to the ejs file as "content"
  //Hint: make sure you use JSON.stringify to turn the JS object from axios into a string.
});

// axios.get(https://secrets-api.appbrewery.com/all?page=2, {
//   auth: {
//     username: "silvia",
//     password: "silvia",
//   }, params: { username }
// });

app.get("/basicAuth", async (req, res) => {
  try {
    const URL = "https://secrets-api.appbrewery.com/all?page=2";

    const response = await axios.get(URL, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      }, 
    });
    //console.log(URL);
    const content = JSON.stringify(response.data);
    res.render("index.ejs", { content: content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 3: Write your code here to hit up the /all endpoint
  //Specify that you only want the secrets from page 2
  //HINT: This is how you can use axios to do basic auth:
  // https://stackoverflow.com/a/74632908
  

  
});

app.get("/apiKey", async (req, res) => {
  try {
    var URL = `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`
    const response = await axios.get(URL);
   // console.log(URL);
    const content = JSON.stringify(response.data);
    res.render("index.ejs", { content: content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 4: Write your code here to hit up the /filter endpoint
  //Filter for all secrets with an embarassment score of 5 or greater
  //HINT: You need to provide a query parameter of apiKey in the request.
});

app.get("/bearerToken", async (req, res) => {
  try {
    var URL = "https://secrets-api.appbrewery.com/secrets/42"

    //const response = await axios.get(URL);
    const response = await axios.get(URL, {
      headers: { 
        Authorization: `Bearer ${yourBearerToken}` 
      },
    });
    const content = JSON.stringify(response.data);
  
   // console.log(content);

    res.render("index.ejs", { content: content });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
  //TODO 5: Write your code here to hit up the /secrets/{id} endpoint
  //and get the secret with id of 42
  //HINT: This is how you can use axios to do bearer token auth:
  // https://stackoverflow.com/a/52645402
  /*
  axios.get(URL, {
    headers: { 
      Authorization: `Bearer <YOUR TOKEN HERE>` 
    },
  });
  */
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
