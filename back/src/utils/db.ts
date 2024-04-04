import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI as string);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;