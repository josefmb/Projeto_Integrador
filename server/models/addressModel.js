import mongoose from "mongoose";

const addressSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    number: {
        type: Number,
        required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    complement: {
      type: String,
      required: false,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
    },
    warehouse: {
      type: Boolean,
      required: false,
      default: false
    }
}
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
