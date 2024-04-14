import mongoose from "mongoose";
const moduleSchema = new mongoose.Schema(
  {
    id: String,
    name: { type: String, required: true },
    description: String,
    course: String,
    lessons: { type: Array, default: [] },
  },
  { collection: "modules" }
);
export default moduleSchema;
