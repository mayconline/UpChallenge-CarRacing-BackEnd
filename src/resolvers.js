const User = require('./Models/User');

module.exports ={
    Query:{
        users:()=> User.find(),
        user:(_, { _id })=> User.findById(_id),
        userByName:(_,{name}) => User.findOne({name})
     
    },

    Mutation:{
        createUser:(_, { name, score })=> User.create({name, score}),
        updateScoreUser:(_,{ _id, score})=> User.findByIdAndUpdate({_id},{score},{new:true}),
        deleteUser:(_,{_id})=> User.findByIdAndRemove({_id}),
        updateScoreUserByName:(_,{name, score})=>User.findOneAndUpdate({name},{score},{new:true})     
    }

   
}