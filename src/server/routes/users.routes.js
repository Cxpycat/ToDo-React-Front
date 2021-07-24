const {Router} = require("express")
const router = Router();
const User = require("../models/User");

router.get('/', async (request, response) => {
    try {
        if(Object.keys(request.query).length === 0) {
            const users = await User.find();
            return response.end(JSON.stringify(users, null, '  '));
        }

        const {username, website} = request.query;
        const user = await User.find({username: username, website: website});

        response.end(JSON.stringify(user, null, '  '));

    } catch (e) {
        response.status(500).json({message: 'Todo adding is failed'});
    }
});

// POST: /users to add user
router.post('/', async (request, response) => {
    try {
        const { id, username, website} = request.body;
        const possibleUser = await User.findOne({id: id});

        if (possibleUser) {
            return response.status(400).json({message: "User with same id is already exists!"})
        }

        const newUser = new User({
            id: id,
            username: username,
            website: website
        });

        await newUser.save();

        response.status(201).json({message: "Users added to database"});

    } catch (e) {
        response.status(500).json({message: 'User adding is failed!'});
    }
});

// POST: /users to add users from array || Created to initialize data
router.post('/usersArrayInit', async (request, response) => {
    try {
        const users = request.body;

        for (const user of users) {
            const { id, username, website} = user;

            const possibleUser = await User.findOne({id: id});

            if (possibleUser) {
                return response.status(400).json({message: `User with ${id} id is already exists!`})
            }

            const newUser = new User({
                id: id,
                username: username,
                website: website
            });

            await newUser.save();
        }
        response.status(201).json({message: "Users added to database"});

    } catch (e) {
        response.status(500).json({message: 'User adding is failed!'});
    }
});

module.exports = router;