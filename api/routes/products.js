const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        com_pro_id: '产品ID',
        com_pro_name: '产品名称',
        com_pro_detail: '产品简单介绍'
    });
});

module.exports = router;