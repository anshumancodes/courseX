import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  acessKey: [
    {
      type: String,
     
    },
  ],
   courses:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Course"
   }]
  
},{
    timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;
