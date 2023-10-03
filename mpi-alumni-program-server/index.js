/* eslint-disable no-undef */
// setup the express server and create login sign up api
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000 || process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.mongodbUri;
const bcrypt = require("bcrypt");

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align:center; color:green;font-family:Arial; margin-top:5rem'>Server is running</h1>"
  );
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const mpiAlumniCollection = client.db("mpiAlumni").collection("users");

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // =============== auth routes ===============
    // create a user
    app.post("/auth/register", async (req, res) => {
      const user = req.body;
      try {
        if (user?.email) {
          const result = await mpiAlumniCollection.findOne({
            email: user?.email,
          });
          if (result) {
            return res.status(403).send({
              success: false,
              message: "User already exists",
              userId: result._id,
            });
          }
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        const result = await mpiAlumniCollection.insertOne(user);
        res.status(201).send({
          ...result,
          userId: result?.insertedId,
          message: "User created successfully",
        });
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // login user
    app.post("/auth/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const user = await mpiAlumniCollection.findOne({ email: email });
        if (!user) {
          return res.status(401).send({
            success: false,
            message: "Unauthorize User! Email doesn't Match",
          });
        }
        // check bcrypt password
        const isMatch = await bcrypt.compare(password, user?.password);
        if (isMatch) {
          delete user?.password;
          res.status(200).send({
            userId: user._id,
            success: true,
            message: "Login Successfully",
          });
        } else {
          res.status(401).send({
            success: false,
            message: "Unauthorize User! Password doesn't Match",
          });
        }
      } catch (error) {
        res
          .status(500)
          .send({ success: false, message: "Internal server error" });
      }
    });

    // =============== users routes ===============
    // get user
    app.get("/users", async (req, res) => {
      const users = await mpiAlumniCollection.find().toArray();
      res.send(users);
    });

    // get single user
    app.get("/users/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const user = await mpiAlumniCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!user) {
          return res
            .send({ success: false, message: "User not found" })
            .status(400);
        } else {
          delete user.password;
          res.send({ ...user, success: true });
        }
      } catch (error) {
        return res
          .send({
            success: false,
            message: "User not found",
          })
          .status(400);
      }
    });

    //update user
    app.put("/users", async (req, res) => {
      const user = req.body;
      const filter = { email: user.email };
      const options = { upsert: true };
      const updateDoc = { $set: user };
      const result = await mpiAlumniCollection.updateOne(
        filter,
        updateDoc,
        options
      );
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
