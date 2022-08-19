const checkErrors = (error, req, res, next) => {
    // console.error('checkError - error: ', error);
    if (error) {
        return res.send('An error has occurred');
    }

    next();
};

export {
    checkErrors
};