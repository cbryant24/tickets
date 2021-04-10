import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper');

let mongoServer: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
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
  jest.clearAllMocks();

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

global.signin = (id?: string) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`express:sess=${base64}`];
};
