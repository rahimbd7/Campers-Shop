import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";

const main = async () => {
    try {
        await mongoose.connect(config.database_url as string);
        const server: Server = app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
        return server;

    } catch (error) {
        console.log(error);
    }
}
main();