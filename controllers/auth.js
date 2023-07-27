import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
    const user = await User.create({...req.body});
    const token = user.createJWT();
    res
        .status(StatusCodes.CREATED)
        .json({ 
            user: { name: user.name }, 
            token 
        });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    checkEmailAndPasswordAreProvided(email, password);

    const user = await User.findOne({email});
    checkUserIsPresent(user);
   
    const isPasswordCorrect = await user.comparePassword(password);
    checkPasswordIsCorrect(isPasswordCorrect);

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({user: {name: user.name}, token});
};



function checkEmailAndPasswordAreProvided(email, password) {
    if (!email || !password) {
        throw new BadRequestError('Provide email and password, please');
    };
}

function checkUserIsPresent(user) {
    if (!user) {
        throw new UnauthenticatedError('Invalid credentials');
    };
}

function checkPasswordIsCorrect(isPasswordCorrect) {
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid password!');
    };
}

export {
    register,
    login
}