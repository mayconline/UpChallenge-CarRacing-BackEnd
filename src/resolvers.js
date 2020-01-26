const User = require('./Models/User');

module.exports ={
    Query:{
        users:()=> User.find().sort('-score'),
        user:(_, { _id })=> User.findById(_id),
        userByName:(_,{name}) => User.findOne({name})
     
    },

    Mutation:{
      
        createUser: async (_,{name, score})=>{

            let user = await User.findOne({name})
                if(!user){

                   return await User.create({name,score})
                 }
             return user; 

        },

        updateScoreUserByName: async (_,{name, score})=>{
            let user = await User.findOne({name})
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