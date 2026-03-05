import express from "express";
import { connectDB } from "./config/db.ts";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from '@as-integrations/express4';
import { connectGraphQl } from "./config/graphql.ts";
// import { verifyToken } from "./utils/verifytoken/verifyToken.ts";
import "./scheduler/message.scheduler.ts"
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


// graph Ql connection
const server = await connectGraphQl()

app.use(
  "/graphql",
  expressMiddleware(server, 
  //   {
  //   context: async ({ req }) => {
  //     const token = req.headers.token as string;
  //     if (!token) {
  //       throw new Error("Token missing");
  //     }

  //     const {status , message , decoded }:{status:boolean , message:string , decoded?:any} = verifyToken(token);
  //     if(!status){
  //       throw new Error(message)
  //     }
      
  //     return {
  //       userEmail:decoded.email
  //     }
  //   },
  // }
)
);

// const {db} = readAppConfig();\
connectDB().then(() => {
  app.listen(5000,()=>{
    console.log(" Server Running at port 5000")
  })
});
