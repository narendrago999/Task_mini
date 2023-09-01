import express from 'express';
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dbConnection from './db/dbConnection';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
var port = process.env.PORT ;
app.use(cors())
app.use(express.json())


// Register Request

app.post('/register', async (req,res)=>{
  const data = req.body
  try {
    if(data.EmpId !=="" && data.fname !== "" && data.lname !== "" && data.number !== "" && data.email !== "" && data.password !== ""){
      
      const pool = await dbConnection
      const query = `SELECT * FROM employee.UserInfo WHERE EMP_ID = '${data.EmpId}' `
      const userExist = await pool.request().query(query)
      console.log(data.EmpId);
      console.log(userExist);
      
      console.log(data.fname);
      if(userExist.recordset.length > 0){
        res.status(409).json({message:"User Already Registered"})
      }else{
        try {
            const pool = await dbConnection
            const query = `INSERT INTO employee.UserInfo(EMP_ID,FirstName,	
              LastName,Number,	
              Employee_Email,
              Password) VALUES('${data.EmpId}','${data.fname}','${data.lname}','${data.number}','${data.email}','${data.password}')`
              await pool.request().query(query)
              res.status(201).json({message:"User Created"})
        } catch (error) {
          console.log(error);
          
        }
      }
    }else{
      res.json({message:"empty data"})
    }
  } catch (error) {
    console.log(error);
    
  }
})



// Login Request

app.post("/login", async (req,res)=>{
  const data = req.body
  console.log(data.password);
  
  if(data.email !== ""&& data.password != ""){
    try {
      const pool = await dbConnection
      const query = `SELECT * FROM employee.UserInfo WHERE Employee_Email = '${data.email}'`
      const userExist = await pool.request().query(query)
      console.log(userExist);
      
      const user = userExist.recordset[0]
      console.log(data.email);
      
      if(user == undefined ){
        res.status(200).json({message:"User Not Found"})
      }else{
        if(user.Password === data.password){
          const token = jwt.sign(data, 'naren', { expiresIn: '1h' })
          const pool = await dbConnection
          const tokenQuery = `UPDATE employee.UserInfo SET Token = '${token}' WHERE EMP_ID = '${user.EMP_ID}'`
          
          await pool.request().query(tokenQuery)
            res.status(200).json({message:"Login",data:user,token})
         
        }else{
          res.status(200).json({message:"password not matching"})
        }
      }
    } catch (error) {
      console.log(error);
    }
  }else{
    res.json({message:"empty data"})
  }

})


app.post('/profile',async(req,res)=>{
  const {token} = req.body
  if(token){
    try {
      const pool = await dbConnection 
      const userempQuery = `SELECT * FROM employee.UserInfo WHERE Token = '${token}'`
      const userData = await pool.request().query(userempQuery)
      const userProfile = userData.recordset;
      console.log(userProfile);
      
      if(userProfile){
        return res.status(200).json({userProfileData:userProfile})
      }else{
        return res.status(200).json({message:"Not Found"})
      }
    } catch (error) {
      console.log(error);
    }
  }
  
 
})


// app.get('/', async (req, res) => {
// //   const user = new User(1, 'john_doe', 'john@example.com');
// //   res.send(user.username);
//   try {
//     const pool = await dbConnection;
//     const result = await pool.request().query('SELECT * FROM Country');
//     res.json(result.recordset);
//   } catch (error) {
//     console.error('Database error:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
  
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
