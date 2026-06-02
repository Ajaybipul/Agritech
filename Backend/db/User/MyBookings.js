const mongoose = require('mongoose');

const bookingschema = new mongoose.Schema({
    name:String,
    email:String,
    phno:String,
    quantity:String,
    totalamount:String,
    productName:String,
    category:String,
    description:String,
    imageURL:String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    userName:String,
    OrderdDate: {
        type: String, // Store dates as strings
        default: () => new Date().toLocaleDateString('hi-IN') // Set the default value to the current date in "MM/DD/YYYY" format
    },  
    
})

module.exports =mongoose.model('mybookings',bookingschema)

