import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import path from "path"
import colors from "colors"

import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"

import dotenv from "dotenv"

import { errorHandler, notFound } from "./middleware/errorMiddleware.js"
import morgan from "morgan"

dotenv.config()

const PORT = process.env.PORT || 4000

const app = express()

if (process.env.NODE_ENV === "development") {
   app.use(morgan("dev"))
}

app.use(cors())
app.use(bodyParser.json())

app.use("/api/v1/products", productRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/upload", uploadRoutes)

const __dirname = path.resolve()
if (process.env.NODE_ENV === "production") {
   app.use(express.static(path.join(__dirname, "/client/")))
   app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
   )
}

app.use("/uploads", express.static(path.join(__dirname, "/uploads")))

// not found route
app.use(notFound)

// custom handle error
app.use(errorHandler)

app.listen(PORT, () => {
   console.log(`server is listing on ${PORT}-----`.yellow.bold)
   mongoose
      .connect(process.env.DATABASE_URI, {
         useCreateIndex: true,
         useUnifiedTopology: true,
         useNewUrlParser: true,
      })
      .then(() => console.log("DATABASE connected-----".cyan.bold))
      .catch(error =>
         console.log("DATABASE CONNECTION FAILED ".red.underline.bold, error)
      )
})
