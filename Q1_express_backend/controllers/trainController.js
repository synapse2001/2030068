const asyncHandler = require("express-async-handler");
const axios = require("axios");

let ACCESS_TOKEN = ""; 

const fetchAccessCode = async () => {
  const apiUrl = "http://20.244.56.144/train/auth";
  const requestData = {
    companyName: "Gagan's Company",
    clientID: "56a5e4e7-ba49-4abb-a93b-017a5b01e12d",
    clientSecret: "OWJFNwNQBqyozKVG",
    ownerName: "Gagan Agarwal",
    ownerEmail: "gaganagarwal2001@gmail.com",
    rollNo: "2030068",
  };

  try {
    const response = await axios.post(apiUrl, requestData);
    // console.log(response.data.access_token)
    ACCESS_TOKEN = response.data.access_token; 
    console.log("Access code fetched");
  } catch (err) {
    console.error("Error fetching access code:", err.message);
    throw new Error("Error fetching access code");
  }
};

// Fetch the access code on application startup
fetchAccessCode().catch((err) => {
  console.error("Error while fetching access code on startup:", err.message);
});

//@desc Get all trains
//@route GET /api/trains
//@access public
const getTrains = asyncHandler(async (req, res) => {
  console.log("I am Called");
  try {
    const trainsData = await fetchTrainsData();
    res.status(200).json(trainsData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trains data" });
  }
});


//@desc Get train by train number
//@route GET /api/trains/:trainNumber
//@access public
const getTrain = asyncHandler(async (req, res) => {
  const trainNumber = req.params.id;
  console.log(trainNumber)
  try {
    const trainsData = await fetchTrainsData();
    const train = trainsData.find((data) => data.trainNumber === trainNumber);

    if (!train) {
      res.status(404).json({ message: "Train not found" });
    } else {
      res.status(200).json(train);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching trains data" });
  }
});

// Function to fetch trains data using the updated ACCESS_TOKEN
const fetchTrainsData = async () => {
  const access = await fetchAccessCode();
  const apiUrl = "http://20.244.56.144/train/trains";

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // Data fetched from the API
    const trainsData = response.data;
    // console.log("Data fetched from the API:", trainsData);

    return trainsData;
  } catch (err) {
    console.error("Error fetching data from the API:", err.message);
    // Handle errors accordingly
    throw new Error("Error fetching data from the API");
  }
};

module.exports = {
  getTrains,
  getTrain,
};
