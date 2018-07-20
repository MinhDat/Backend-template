import mongoose from "mongoose";
import serverConfig from "./config";

const Connection = {
  main: mongoose.createConnection(serverConfig.mongoURL, {
    useNewUrlParser: true
  })
  // app: mongoose.createConnection(serverConfig.appDbURl, {
  //   useNewUrlParser: true
  // })
};

// mongoose.connection;

Connection.main.on("connected", () => {
  console.log("Connect to database social network success!");
});

// Connection.app.on("connected", () => {
//   console.log("Connect to database OneHealthDB success!");
// });

export default Connection;
