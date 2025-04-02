import { server } from "./server.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/env.js";

const startServer = async () => {
    await connectDB();
    server.listen(PORT, () => {
        console.log(`server started at port: ${PORT}`);
    });
}

startServer();