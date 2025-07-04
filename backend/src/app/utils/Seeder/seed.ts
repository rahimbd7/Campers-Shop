import { seedDatabase } from "./seeder";
import seedData from "./seedingData";


const modelName = 'category';

seedDatabase(modelName, seedData);