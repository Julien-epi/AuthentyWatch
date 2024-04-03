import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://julienranson1:9EyRL9cAcDOUYnfX@authentywatch.zznkybx.mongodb.net/';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected...');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export default connectDB;