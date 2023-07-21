const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors'); 

// connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());
app.use("/api/trains", require("./routes/trainRoutes"));

// app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
