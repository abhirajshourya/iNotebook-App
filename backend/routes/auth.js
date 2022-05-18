const express = require('express');
const router = express.Router();
const users = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"


//ROUTE 1: Create a user using POST "/api/auth/signup". Doesn't require auth.
router.post('/signup', [
    // name must be an atleast 3 chars long
    body('name', 'Enter a valid Name!').isLength({ min: 3 }),
    // email validator
    body('email', 'Enter a valid email address!').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Enter a password atleast 5 characters long!').isLength({ min: 5 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check user with this email exists already and/or create a new user
    try {
        //find the user in database
        let user = await users.findOne({ email: req.body.email })
        //check user exist
        if (user) {
            return res.status(400).json({
                error: "user already exists!"
            })
        }
        //password encrypt
        const salt = await bcrypt.genSalt(10)
        let secPass = await bcrypt.hash(req.body.password, salt)


        //create a new user
        user = await users.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            salt: salt
            //id is appended automatically
            //date appended automatically
        })

        //jwt authentication
        const authToken = await jwt.sign({ user: user.id }, JWT_SECRET);

        //send authToken as a response
        res.json({ authToken: authToken })
    }
    catch (error) {
        res.status(500).send("Interal Server Error!")
    }
})


//ROUTE 2: Authenticate a user using POST "/api/auth/login".
router.post('/login', [
    // email validator
    body('email', 'Enter a valid email address!').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Enter a password atleast 5 characters long!').isLength({ min: 5 })
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body
    try {
        let user = await users.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "try again with correct credentials" })
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ error: "try again with correct credentials" })
        }

        //jwt authentication
        const authToken = await jwt.sign({ user: user.id }, JWT_SECRET);

        //send authToken as a response
        res.json({ authToken: authToken })
    }
    catch (error) {
        console.log(error)
        res.status(500).send("Interal Server Error!")
    }
})

//ROUTE 3: Get logged in user details using POST "/api/auth/getuser". Login Required
router.post('/getuser', fetchUser, async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await users.findById(req.userid).select("-password")
        res.status(200).send(user)
    }
    catch (error) {
        res.status(500).send("Interal Server Error!")
    }
})
module.exports = router;