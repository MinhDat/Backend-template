const PrimaryDate = {
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  update: {
    type: [
      {
        _id: false,
        time: {
          type: Date,
          default: new Date()
        },
        updateBy: {
          type: String
        }
      }
    ]
  }
};

export default PrimaryDate;
