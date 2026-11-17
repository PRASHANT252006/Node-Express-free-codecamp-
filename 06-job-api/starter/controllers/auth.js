require('dotenv').config();
const jwt = require('jsonwebtoken');
const { BadRequest } = require('../error');
const User = require('../models/User.js');
const Session = require('../models/sessionmodel.js');
const { StatusCodes } = require('http-status-codes');
const { generateTokens } = require('../utility/generatetoken.js');
const { hashToken } = require('../utility/hashToken.js');

const setCookies = (res, accesstoken, refreshtoken) => {
    res.cookie('accesstoken', accesstoken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 15 * 60 * 1000
    });

    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    res.status(StatusCodes.CREATED).json({
        msg: 'User registered successfully',
        user: { name: user.name }
    });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequest('plz provide email and password');
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        throw new BadRequest('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparepassword(password);

    if (!isPasswordCorrect) {
        throw new BadRequest('Invalid Credentials');
    }

    const { accessToken, refreshToken } = generateTokens(user);

    await Session.create({
        userId: user._id,
        refreshToken: hashToken(refreshToken)
    });

    setCookies(res, accessToken, refreshToken);

    res.status(StatusCodes.OK).json({
        msg: 'Login successful',
        user: { name: user.name }
    });
};

const refreshAccessToken = async (req, res) => {
    const oldRefreshToken = req.cookies.refreshtoken;

    if (!oldRefreshToken) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Refresh token required' });
    }

    try {
        const decoded = jwt.verify(oldRefreshToken, process.env.JWT_REFRESH_SECRET);

        const session = await Session.findOne({
            userId: decoded.id,
            refreshToken: hashToken(oldRefreshToken)
        });

        if (!session) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Invalid refresh token' });
        }

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'User not found' });
        }

        const { accessToken, refreshToken } = generateTokens(user);

        session.refreshToken = hashToken(refreshToken);
        session.createdAt = new Date();
        await session.save();

        setCookies(res, accessToken, refreshToken);

        res.status(StatusCodes.OK).json({ msg: 'Token refreshed' });
    } catch (error) {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Invalid or expired refresh token' });
    }
};

module.exports = { register, login, refreshAccessToken };