const { connect } = require("mongoose");
const {config} = require('dotenv')
config();


connect(process.env.MONGO_URL).then(() => {

    console.log(`Mongo DB connected`);
}).catch((err) => {
    console.log(err);
})