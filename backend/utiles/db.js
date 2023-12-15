const mongoose = require('mongoose');

module.exports.dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // to avoid DeprecationWarning
        });
        const dbUrl = process.env.DB_URL;
        console.log(`Database connected to ${dbUrl}`);
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};
