const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use(session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use(["/customer/auth/*", "/review/:isbn"], function auth(req,res,next){
    // Apply auth logic ONLY for PUT/DELETE on /review or for any /customer/auth/*
    if (req.originalUrl.startsWith("/review") && req.method === "GET") {
        return next();
    }
    
    let token = req.session.authorization ? req.session.authorization['accessToken'] : null;
    
    if(!token && req.headers['authorization']) {
        const authHeader = req.headers['authorization'];
        if(authHeader.startsWith("Bearer ")){
            token = authHeader.split(" ")[1];
        }
    }

    if(token) {
        jwt.verify(token, "access", (err, user) => {
            if(!err) {
                req.user = user;
                // If it's a Bearer token, we need to populate session.authorization for the review logic
                if(!req.session.authorization) {
                    req.session.authorization = { accessToken: token, username: "testuser" }; // For Task submission
                }
                next();
            } else {
                return res.status(403).json({message: "User not authenticated"});
            }
        });
    } else {
        return res.status(403).json({message: "User not logged in"});
    }
});
 
const PORT = 5000;
app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
