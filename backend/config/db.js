import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB'ga Ulanish hosil bo'ldi", conn.connection.host);
    } catch (error) {
        console.error("MongoDB'ga Ulanish vaqtida xatolik yuz berdi.", error.message)
        process.exit(1)
    }
}

export default connectDB