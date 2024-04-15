import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import session from "express-session";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Courses/routes.js";
import ModuleRoutes from "./Modules/routes.js";

// GitHub branches
const branches = ["main", "a5", "a6", "project"];

const strippedNetlifyUrl = process.env.NETLIFY_URL.replace("https://", "");
const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...branches.map((branch) => `https://${branch}--${strippedNetlifyUrl}`),
];

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://192.168.1.132:27017/kanbas";
mongoose.connect(CONNECTION_STRING);
const app = express();
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
    },
  })
);
app.use(express.json());
UserRoutes(app);
Hello(app);
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
app.listen(process.env.PORT || 4000);
