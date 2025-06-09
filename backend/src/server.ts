import app from ".";
require("dotenv").config();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

// Shut down the server upon unhandled rejection
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION closing server");

  server.close(() => {
    process.exit(1);
  });
});

// Gracefully shut down the server on process termination
process.on("SIGTERM", () => {
  console.log("SIGTERM signal RECEIVED. closing server gracefully");
  server.close(() => {
    console.log("Process terminated successfully");
  });
});
