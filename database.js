//The require(‘mongoose’) call above returns a Singleton object. 
//It means that the first time you call require(‘mongoose’), it 
//is creating an instance of the Mongoose class and returning it. 
//On subsequent calls, it will return the same instance that was 
//created and returned to you the first time because of how module 
//import/export works in ES6.

const mongoose = require('mongoose');
// mongoose.set('useUnifiedTopology' , true);  // <-- no longer necessary
// mongoose.set('useFindAndModify' , false);  // <-- no longer necessary

class Database {
    constructor() {
      this.connect();
    }

    connect() {
        mongoose.connect("mongodb+srv://medo:LoooooL2244565@twitterclonecluster.or0hxwd.mongodb.net/?retryWrites=true&w=majority")
            .then(() => {
                console.log('database connection established')
            })
            .catch((err) => {
                console.log('database connection error' + err.message)
            })
    }
}

module.exports = new Database()