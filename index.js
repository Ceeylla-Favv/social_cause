const express = require("express");
const cors = require("cors");
const connectDb = require("./db/connectDb");
const router = require("./routes/causeRoutes");
const contributionRoutes = require("./routes/contributionRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/", router);
app.use("/api/v1/contribute", contributionRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ info: "API working perfectly" });
});

const port = 2025;

app.listen(port, async () => {
  console.log(`server is working at port ${port}`);
  await connectDb();
});
