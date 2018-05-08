const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        pro_type_id: "产品类型ID",
        pro_type_name: "产品类型名稱"
    });
});

module.exports = router;