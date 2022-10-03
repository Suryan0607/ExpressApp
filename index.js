require('dotenv').config();

const express=require('express');
const cors=require('cors')

// importing routes
const genaralRouter=require('./myModules/gen_routes');
const quotesRouter=require('./myModules/quot_routes');
const authenRoutes = require('./myModules/authen_routes');
const userRoutes=require('./myModules/user_routes');
const {requireSignIn,isAuth,isAdmin}=require('./myModules/auth')

// importing DtaBase
const { Db } = require('./db/mongoose');

// database  initiated
Db()

// try {
//     dB.connectToServer(function(err){
//         if(err){
//             console.log(err)
//         }
//     })
    
// } catch (error) {
//     console.log(error)
// }

// Express Initiated
const app=express();

//3rd party middleware 
app.use(cors());
app.use(express.json());

//custom middleware
app.use('/api',authenRoutes);
app.use('/api',genaralRouter);
app.use('/api',requireSignIn,isAuth,isAdmin,userRoutes);
app.use('/api',requireSignIn,isAuth,quotesRouter);

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`App Listening On Port ${PORT}`)
})