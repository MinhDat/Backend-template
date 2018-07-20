import util from "util";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

function PrimaryInfo() {
  Schema.apply(this, arguments);
  this.add({
    address: {
      type: {
        lat: {
          type: String
        },
        long: {
          type: String
        },
        street: {
          type: String,
          required: true
        },
        district: {
          type: String,
          required: true
        },
        city: {
          type: String
        },
        cityCode: {
          type: String
        },
        province: {
          type: String
        },
        provinceCode: {
          type: String
        },
        country: {
          type: String,
          required: true
        },
        countryCode: {
          type: String
        },
        zipCode: {
          type: String
        },
        _id: false
      }
      // required: true
    },
    phone: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address"
      ],
      required: true
    }
  });
}

util.inherits(PrimaryInfo, Schema);

export default PrimaryInfo;
