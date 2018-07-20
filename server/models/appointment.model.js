import mongoose from "mongoose";
import PrimaryDate from "./utils/primaryDate";

const Schema = mongoose.Schema;
const Appointment = new Schema(
  {
    date: {
      type: Date,
      required: true
    },
    code: {
      type: String,
      unique: true,
      uppercase: true,
      required: true
    },
    fitness: {
      type: Schema.Types.ObjectId,
      required: true
    },
    client: {
      type: Schema.Types.ObjectId,
      required: true
    },
    delete: {
      type: Boolean,
      default: false,
      required: true
    },
    status: {
      type: String,
      enum: ["new", "cancel", "done"],
      required: true,
      default: "new"
    }
  },
  { versionKey: false }
);

// Add primary date
Appointment.add(PrimaryDate);

const AppointmentModel = mongoose.model("appointment", Appointment);

export default AppointmentModel;
