const User = require('./Models/User');

module.exports ={
    Query:{
        users:()=> User.find().sort('-score'),
        user:(_, { _id })=> User.findById(_id),
        userByName:(_,{name}) => User.findOne({name})
     
    },

    Mutation:{
      
        createUser: async (_,{name})=>{
            let nickname = name.toLowerCase();

            let user = await User.findOne({name:nickname})
                if(!user){

                   return await User.create({name:nickname,score:0})
                 }
             return user; 

        },

        updateScoreUserByName: async (_,{name, score})=>{
            let nickname = name.toLowerCase();

            let user = await User.findOne({name:nickname})
                if(user.score < score){
                    user.score=score;
                        await user.save();
                            return user;
                }
            return user;
        },

        deleteUser:(_,{_id})=> User.findByIdAndRemove({_id})
    }

   
}