import mongoose from "mongoose"
 
const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB||'')
    if (connection) {
      console.log("Connection established")
    }
  } catch (error) {
    console.log("error in connectToDatabase", error)
    throw error
  }
}

export default connectToDatabase