const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const ToySchema = new Schema({ name: String , iskey: Boolean, figure: String, color: String});

const NodeSchema = new Schema(
  {
    key: String,
    items: [ToySchema]
    
  },
  {
    collection: 'Node',
    read: 'nearest'
  }
);



const Node = mongoose.model('Node', NodeSchema);



module.exports = Node;
