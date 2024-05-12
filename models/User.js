const { model, Schema, mongoose } = require('mongoose')

function validateEmail(value) {
    const exp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
    return exp.test(value)
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        validate: [validateEmail, 'you  must enter a valid email address'],
        required: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        Ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        Ref: 'User'
    }]
})

userSchema.pre('remove', async function(next) { 
    // Find all thoughts associated with the user and remove them
    await this.thoughts.deleteMany({ username: this.username });
  
    next();
  });


userSchema.virtual('friendCount').get(() => {
    return this.friends.length
})

const User = model('User', userSchema)

module.exports = User