const config = {
    port: 'https://nexus-11h5.onrender.com',
    jwtSecret: process.env.JWT_SECRET || "NexusAuthenticate", 
    mongoUri: process.env.MONGODB_URI || "mongodb+srv://Dom1232:NexusAppGroupProject@nexusdatabase.uimnpxh.mongodb.net/Nexus?retryWrites=true&w=majority"
}
module.exports = config;
    

