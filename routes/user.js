var express = require('express');
var router = express.Router();
var controller = require('../controllers');

router.get('/', controller.user.index);//�����û���־�ȼ�ҳ��

router.get('/add', controller.user.addUserPage);//�����û���־�ȼ�ҳ��
router.post('/add', controller.user.addUser);//�����û���־��Ϣ�ύ


router.get('/delete', controller.user.deleteUser);//ɾ���û�

router.get('/list', controller.user.userList);//��ȡ��־�ȼ�����û��б�

router.get('/update/:id', controller.user.updatePage);//�޸��û��ȼ�ҳ��
router.post('/update', controller.user.updateUser);//�޸�ָ��uid�û��ȼ��ύ

module.exports = router;
