import app from "./app";

const PORT = 80;

async function run() {
  app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });
}

run();
