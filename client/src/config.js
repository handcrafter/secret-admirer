var PORT = 5000;
var URL = "http://localhost:5000";

if (process.env.NODE_ENV === "production") {
    PORT = 80;
    URL = "http://secretadmirer.me";
} 

export default {PORT, URL};
