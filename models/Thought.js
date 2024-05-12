const { model, Schema, mongoose } = require('mongoose')

function validateThoughtText(value) {
    const exp = new RegExp(/^.{1,280}$/)
    return exp.test(value)
}


const reactionSchema = new Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody:{
        type:String,
        required:true,
        maxLength:[280,"no more than 280 characters"]
    },
    username:{
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
    }
})
reactionSchema.virtual('formattedCreatedAt').get(()=> {
    return this.createdAt.toLocaleDateString('en-US', 'numeric');
});



const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        validate: [validateThoughtText, 'you  must enter a value between 1 and 280 characters'],
        
    },
    username: {
        type: String,
        required: true,
    },
    reactions:[reactionSchema],
    createdAt: {
        type: Date,
        default: Date.now // Set the default value to the current date and time
    }
})

//virtual property to format the createdAt timestamp
thoughtsSchema.virtual('formattedCreatedAt').get(()=> {
    return this.createdAt.toLocaleDateString('en-US', 'numeric');
});

thoughtsSchema.virtual('reactionCount').get(()=> {
    return this.reactions.length
});

const Thought = model('Thought',thoughtsSchema)

module.exports = Thought;