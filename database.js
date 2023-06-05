
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