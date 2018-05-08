const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        cat_id: 1,
        cat_name: 'Handling GET categories'
    });
});

module.exports = router;