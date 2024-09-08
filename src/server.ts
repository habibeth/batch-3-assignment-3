import app from './app';
import mongoose from 'mongoose';
import config from './app/config';
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    const server = app.listen(config.port, () => {
      console.log(`Server Running on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', (error) => {
  console.log('👹 unhandledRejection is detected, shutting down App!', error)
  if (server) {
    server.close(() => {
      process.exit(1);
    })
  }
  process.exit(1);
})

process.on('uncaughtException', () => {
  console.log('👹 uncaughtException is detected, shutting down App!');
  process.exit(1)
})