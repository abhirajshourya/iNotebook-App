const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://inotebook:AAmfpHEvkZ50wXG5@cluster0.thhlk.mongodb.net/inotebook?retryWrites=true&w=majority"

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to MongoDB successfully!");
    });
}

module.exports = connectToMongo;