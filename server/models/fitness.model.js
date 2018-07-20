import mongoose from "mongoose";
import Connection from "../connection";
import PrimaryDate from "./utils/primaryDate";
import PrimaryInfo from "./utils/primaryInfo";

const Schema = mongoose.Schema;
const Fitness = new PrimaryInfo(
  {
    domain: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    logo: {
      type: Schema.Types.ObjectId
      //default: new mongoose.Types.ObjectId()
    },
    images: {
      type: [
        {
          url: Schema.Types.ObjectId,
          _id: false
        }
      ]
    },
    info: {
      type: String
    },
    utilities: [
      {
        type: String,
        enum: [
          "parking",
          "steam room",
          "boxing",
          "carpet",
          "personal trainer",
          "closet",
          "exercise towel",
          "nutritious drinks",
          "bathroom"
        ],
        //bãi gửi xe, phòng xông hơi, boxing, thảm tập yoga, HLV cá nhân, tủ đồ, khăn tập, đồ uống dinh dưỡng, phòng tắm
        _id: false
      }
    ],
    delete: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      unique: true,
      uppercase: true
    },
    subjects: [
      {
        type: String,
        enum: [
          "gym",
          "yoga",
          "beauty",
          "aerobics",
          "martial arts",
          "swimming",
          "zumba",
          "boxing",
          "dance",
          "exercise"
        ],
        //gym , yoga, làm đẹp, thể dục thẩm mỹ, võ thuật, bơi, zumba, kick-boxing, nhảy - khiêu vũ, thể dục
        _id: false
      }
    ]
  },
  { versionKey: false }
);

//Add the primary schemas
Fitness.add(PrimaryDate);
// Fitness.add(PrimaryInfo);
Fitness.pre("save", async function(next) {
  let self = this;
  if (this.isNew) {
    await getCode(self, next);
  }
});

async function getCode(self, next) {
  const text = "QWERTYUIOPASDFGHJKLZXCVBNM0123456789";
  let testprefix = "OHF";
  for (let i = 0; i < 6; i++) {
    testprefix += text.charAt(Math.floor(Math.random() * text.length));
  }
  let check = await self.constructor.findOne({
    code: testprefix
  });
  // console.log("test", testprefix, check);
  if (check) {
    await getCode(self, next);
  } else {
    self.code = testprefix;
    next();
  }
}

const FitnessModel = Connection.main.model("Fitness", Fitness);

export default FitnessModel;
