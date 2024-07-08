const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json())
const PORT = process.env.PORT || 8080;
const schemaData=mongoose.Schema({
    title:String,
    content:String,
    creationDate:String
},{
    timesTamps:true
})
const userModel =mongoose.model("user",schemaData)
// read
app.get("/", async(req, res) => {
    const data =await userModel.find({})
  res.json({ success:true ,data :data });
});
// create data || save data in mongodb
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data =new userModel(req.body)
    await data.save()
    res.send({success: true ,message:"data save successfully" ,data:data})

})
// update data
// app.put("/update",async(req,res)=>{
//     console.log(req.body)
//     const {id,...rest}=req.body;
//     console.log(rest)
//     const data =await userModel.updateOne({_id:id},rest )
//     res.send({success: true ,message:"data update successfully",data :data})
//     console.log(data)

// })
app.put("/update", async (req, res) => {
    console.log(req.body);
    const { _id, ...rest } = req.body; 
    console.log(rest);
    try {
      const result = await userModel.updateOne({ _id: _id }, rest);
      if (result.modifiedCount > 0) {
        const updatedData = await userModel.findById(_id); 
        res.send({ success: true, message: "data update successfully", data: updatedData });
      } else {
        res.send({ success: false, message: "No document found with the given ID" });
      }
    } catch (error) {
      res.status(500).send({ success: false, message: "Error updating data", error: error.message });
    }
  });
  
// delete 
app.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    console.log(id);
    const data =await userModel.deleteOne({_id:id})
    res.send({success:true ,message:"data deleted successfully ",data:data})
})
app.post
// const f=3;
mongoose
  .connect("mongodb://127.0.0.1:27017/crudop")
  .then(() => {
    app.listen(PORT, () => console.log("server is running"));
    console.log("connect to DB");
  })

  .catch((err) => console.log(err));
