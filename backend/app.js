import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './DB/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import product from './routes/productRoutes.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors(
    {
        origin:true,
        credentials:true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', userRoutes);
app.use('/api/products',product);

connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})