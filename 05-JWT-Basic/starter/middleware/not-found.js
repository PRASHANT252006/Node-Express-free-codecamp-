const notfound = (req, res) => {
    res.status(404).send(`No such URL: ${req.url}`);
};

module.exports = notfound;
