import { PrismaClient } from "@prisma/client";
import Redis from "redis";

const redisClient = Redis.createClient();

const prisma = new PrismaClient();
const DEFAULT_EXPIRATION = 600;

const getApiDataService = async () => {
  try {
    await redisClient.connect();
    const keyExists = await redisClient.exists("todos");
    if (keyExists) {
      const data = await redisClient.get("todos");
      redisClient.quit();
      return JSON.parse(data);
    } else {
      const response = await prisma.data.findMany();
      await redisClient.SETEX(
        "todos",
        DEFAULT_EXPIRATION,
        JSON.stringify(response)
      );
      redisClient.quit();
      return response;
    }
  } catch (error) {
    return error;
  }
};

const postApiDataService = async (data) => {
  try {
    await redisClient.connect();
    const redisDataExists = await redisClient.exists("todos");
    if (redisDataExists) {
      const deleteKey = await redisClient.del("todos");
      if (deleteKey) console.log("....data deleted");
      redisClient.quit();
    }
    const response = await prisma.data.create({ data: data });
    return response;
  } catch (error) {
    return error;
  }
};

export { getApiDataService, postApiDataService };
