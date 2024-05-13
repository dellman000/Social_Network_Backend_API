const router = require('express').Router()
const { User, Thought} = require('../models')
const { ObjectId } = require('mongodb');
const { log } = console
router.get('/thought', async (req, res) => {
    try {
        // log("hello")
        const allThought = await Thought.find({})
        res.json(allThought)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.get('/thought/:id', async (req, res) => {
    try {
        log("hello")
        const oneThought = await Thought.findById(req.params.id)
        res.json(oneThought)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.post('/thought', async (req, res) => {
    const thoughtInfo = req.body
    try {
        console.log("post")
        const findUser = await User.findById(thoughtInfo.userId)
        if (!findUser) return res.status(404).json({ message: 'User not found' });
        const newThought = await Thought.create({
            thoughtText: thoughtInfo.thoughtText,
            username: findUser.username
        })
        findUser.thoughts.push(newThought._id)
        res.json(newThought)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.put('/thought/:id', async (req, res) => {
    try {
        log("put")
        const newObjectId = new ObjectId(req.params.id);
        const updateUser = await Thought.findOneAndUpdate({ _id: newObjectId }, req.body, { new: true })
        if (!updateUser) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updateUser)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.delete('/thought/:id', async (req, res) => {
    try {
        log("remove")
        const removeUser = await Thought.findByIdAndDelete(req.params.id)
        res.json(removeUser)
    } catch (error) {
        log(error)
        res.json(error)
    }
})


router.post('/thought/reaction/:thoughtID', async (req, res) => {
    try {
        log("post")
        const insertIntoThought = await Thought.findById(req.params.thoughtID);
        const createReaction = {...req.body}
        insertIntoThought.reactions.push(createReaction)

        insertIntoThought.save()
        if (!insertIntoThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(createReaction)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.delete('/thought/reaction/:thoughtID', async (req, res) => {
    try {
        log("delete")
        const {reactionId}=req.body
        const reactionIdOBJ=new ObjectId(reactionId)
        const deleteFromThought = await Thought.findById(req.params.thoughtID);
        const newArr=[]
        deleteFromThought.reactions.forEach((reaction) => {
            if (reaction.reactionId.equals(reactionIdOBJ)){
                // log(reaction.reactionId.equals(reactionIdOBJ))
            }
            else{
                newArr.push(reaction)
            }})

        // log(NewArr)
        deleteFromThought.reactions=newArr
        deleteFromThought.save()
        if (!deleteFromThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(deleteFromThought)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

module.exports = router