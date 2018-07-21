import mongoose from "mongoose";
import serverConfig from "./config";

const Connection = {
  main: mongoose.createConnection(serverConfig.webDbURL, {
    useNewUrlParser: true
  })
  // main: mongoose.createConnection(serverConfig.mongoURL, {
  //   useNewUrlParser: true
  // })
  // app: mongoose.createConnection(serverConfig.appDbURl)
};

// mongoose.connection;

Connection.main.on("connected", () => {
  console.log("Connect to database social network success!");
});

// Connection.app.on("connected", () => {
//   console.log("Connect to database ReactJSTemplateDB success!");
// });

export default Connection;
