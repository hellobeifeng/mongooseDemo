var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.user.index);//设置用户日志等级页面

router.get('/add', controller.user.addUserPage);//设置用户日志等级页面
router.post('/add', controller.user.addUser);//设置用户日志信息提交


router.get('/delete', controller.user.deleteUser);//删除用户

router.get('/list', controller.user.userList);//获取日志等级相关用户列表

router.get('/update/:id', controller.user.updatePage);//修改用户等级页面
router.post('/update', controller.user.updateUser);//修改指定uid用户等级提交

module.exports = router;
