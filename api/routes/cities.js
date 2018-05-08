const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        city_id: "城市ID",
        city_name: "城市名稱"
    });
});

module.exports = router;