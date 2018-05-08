const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        coun_id: "國家ID",
        coun_name: "國家名稱"
    });
});

module.exports = router;