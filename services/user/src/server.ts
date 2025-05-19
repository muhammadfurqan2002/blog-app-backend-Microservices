import expres from 'express'
import dotenv from 'dotenv'
import connectDb from './utils/db.js'
import userRoute from './routes/user.js'
import {v2} from 'cloudinary'
dotenv.config()
const app=expres()
const port=process.env.PORT;

v2.config({
    cloud_name:process.env.Cloud_Name as string,
    api_key:process.env.Cloud_Api_Key as string,
    api_secret:process.env.Cloud_Api_Secret as string
})

app.use(expres.json())

connectDb();


app.use('/api/v1',userRoute)



app.listen(port,()=>{
    console.log(`Server is running on port ${port} `)
})