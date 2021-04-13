import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongoServer: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  mongoServer = new MongoMemoryServer();
  await mongoServer.start();
  mongoose.Promise = Promise;

  const mongoUri = mongoServer.getUri(false);

  await mongoose.connect(
    mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) console.error(err);
    }
  );
});

beforeEach(async () => {
  await new Promise<void>((resolve, reject) => {
    if (!mongoose.connection.db) {
      setTimeout(() => {
        if (mongoose.connection.db) {
          resolve();
        } else {
          reject();
        }
      }, 1000);
    } else {
      resolve();
    }
  });

  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoServer.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = "test@test.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
