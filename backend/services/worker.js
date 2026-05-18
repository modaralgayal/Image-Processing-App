import { Worker, Job } from "bullmq";
import IORedis from "ioredis";
import sharp from "sharp";

const connection = {
  host: "localhost",
  port: 6379,
};

export const myWorker = new Worker(
  "images",
  async (job) => {
    const imagePath = job.data.path;
    console.log(`Resizing image ${imagePath}`);

    await sharp(imagePath).resize(800, 600, { fit: "outside" }).toBuffer();

    console.log(`Done processing ${imagePath}`);
  },
  { connection },
);

myWorker.on("completed", (job) =>
  console.log(`Job with id ${job.id} is complete`),
);
myWorker.on("failed", (job, err) =>
  console.log(`Job with id ${job.id} has failed with error: ${err.message}`),
);
