const router = require('express').Router()
const { User } = require('../models')
const { ObjectId } = require('mongodb');
const { log } = console
router.get('/users', async (req, res) => {
    try {
        log("hello")
        const allUsers = await User.find({})
        res.json(allUsers)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        log("hello")
        const oneUser = await User.findById(req.params.id)
        res.json(oneUser)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.post('/users', async (req, res) => {
    try {
        console.log("post")
        const allUsers = await User.create(req.body)
        res.json(allUsers)
    } catch (error) {
        log(error)
        res.json(error)
    }
})


router.put('/users/:id', async (req, res) => {
    try {
        log("put")
        const newObjectId = new ObjectId(req.params.id);
        const updateUser = await User.findOneAndUpdate({ _id: newObjectId }, req.body, { new: true })
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updateUser)
    } catch (error) {
        log(error)
        res.json(error)
    }
})

router.post('/users/friends/:userID', async (req, res) => {
    try {
        const friendID = new ObjectId(req.body.friendID)
        const updateUser = await User.findById(req.params.userID)
        updateUser.friends.push(friendID)
        updateUser.save()
        res.json({ friendID: friendID })
    } catch (error) {
        log(error)
        res.json(error)
    }
})
router.delete('/users/friends/:userID', async (req, res) => {
    try {
        const friendObject = new ObjectId(req.body.friendID)
        const updateUser = await User.findById(req.params.userID)

        let newFriendList = updateUser.friends.filter((friend) => friend.inspect() != friendObject.inspect())
        updateUser.friends = newFriendList
        updateUser.save()
        res.json({ friendID: friendObject })
    } catch (error) {
        log(error)
        res.json(error)
    }
})


router.delete('/users/:id', async (req, res) => {
    try {
        log("remove")
        const removeUser = await User.findByIdAndDelete(req.params.id)
        res.json(removeUser)
    } catch (error) {
        log(error)
        res.json(error)
    }
})
module.exports = router