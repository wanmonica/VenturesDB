const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        com_id: '公司ID',
        com_name: '公司名称',
        com_sec_name: '公司简称',
        com_registered_name: '公司注册名称',
        com_logo: '公司LOGO',
        com_des: '公司描述信息',
        com_cont_addr: '公司详细地址'
    });
});

module.exports = router;