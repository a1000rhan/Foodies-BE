const LocalStartegy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy
const User = require ("../db/models/User");
const bcrypt = require("bcrypt");
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const {JWT_SECRETKEY} = require("../config/keys")

exports.localStartegy = new LocalStartegy(async(username,password,done) =>{
 try{
    const user = await User.findOne({username:username})
   
        //check password
        const passwordMatch = user ? await bcrypt.compare(password,user.password):false;
        if(passwordMatch){
           //go to sign in 
           done (null,user);
           
        }else{
             done (null,false);//401
        }
 }catch(error){
   done(error)
 }
});

exports.jwtStrategy = new JWTStrategy(
{
    jwtFromRequest : fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRETKEY
}, 

async(jwtPayload,done) =>{
    console.log("🚀 ~ file: passport.js ~ line 33 ~ async ~ jwtPayload", jwtPayload)
    try{
        if (Date.now() > jwtPayload.exp){ 
            done(null,false)
        }else{
            const user = await User.findOne({_id: jwtPayload.id});
            if(user) {
                done(null,user)
            }else{ done(null,false) }
                }

    }catch(error){
        done(error);
    }
}
);

