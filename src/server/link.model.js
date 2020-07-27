const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinkSchemac = new Schema(
  {
    from: String, 
    to: String
    
  },
  {
    collection: 'Link',
    read: 'nearest'
  }
);


const Link = mongoose.model('Link', LinkSchemac);

module.exports = Link;
