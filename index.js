import express from "express";
import cors from "cors";
import rootRouter from "./src/routes/root.router.js";

const app = express();
const port = 8080;

// add middleware to read JSON
app.use(express.json());

// add middleware cors to allow frontend to call api to backend
app.use(cors());

// import root routes
app.use(rootRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
