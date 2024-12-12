import mongoose from 'mongoose';
import { DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_DIALECT, DB_PORT } from '@config/db';
import { logger } from '@globals/logger';

const somethingIsNotDefined = [DB_HOST, DB_NAME, DB_PASS, DB_USER, DB_DIALECT, DB_PORT].some((it) => it === undefined);

if (somethingIsNotDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

const connectToDb = async() => {
  try {
    await mongoose.connect(`${DB_DIALECT}://${DB_HOST}:${DB_PORT}`, {
      dbName: DB_NAME,
      user: DB_USER,
      pass: DB_PASS,
    });
    logger.info('Connection to the database has been established successfully.');
    console.log('Connection to the database has been established successfully.');
  } catch (error: any) {
    console.log(error, error.message);
    logger.error(error, error.message);
  }
};

export {
  connectToDb,
};
