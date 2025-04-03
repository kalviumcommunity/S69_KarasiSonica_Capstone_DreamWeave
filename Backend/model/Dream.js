const mongoose = require("mongoose");

const DreamSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
},
  title: { 
    type: String, 
    required: true 
},
  description: { 
    type: String, 
    required: true 
},
  mood: { 
    type: String, 
    enum: ["Happy", "Sad", "Scary", "Weird", "Exciting"], 
    required: true 
},
  dreamThemes: [{ 
    type: String 
}],

  createdAt: { 
    type: Date, 
    default: Date.now 
},
});

const Dream = mongoose.model("Dream", DreamSchema);

module.exports = Dream;
