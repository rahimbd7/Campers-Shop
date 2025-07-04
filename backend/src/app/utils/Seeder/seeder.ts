import mongoose from 'mongoose';

import config from '../../config';
import modelMap from './seedModel';


// Optional: log in color
const log = console.log;
export const seedDatabase = async (modelName: string, data: any[]) => {
  try {
    if (!modelMap[modelName]) {
      throw new Error(`❌ Model '${modelName}' not found in modelMap`);
    }

    await mongoose.connect(config.database_url as string);
    log(`🔗 Connected to MongoDB`);

    const Model = modelMap[modelName];
    await Model.insertMany(data);
    log(`✅ Successfully seeded '${modelName}' with ${data.length} records`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    log(`❌ Seeder Error:`, error);
    process.exit(1);
  }
};
