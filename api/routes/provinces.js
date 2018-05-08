const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        prov_id: "省份 ID",
        prov_name: "省份名稱"
    });
});

module.exports = router;