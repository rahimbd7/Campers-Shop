import { Server } from "http";
import app from "./app";
const port = process.env.PORT || 3000;
const main = async () => {
    const server: Server = app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
    return server;
}
main();