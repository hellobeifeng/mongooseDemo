var _ = require('underscore');
var User = require('../models/user');

module.exports = {

  /**
   * 首页
   */
  index: function(req, res) {
    res.render('index')
  },
  /**
   * 添加用户
   */
  addUserPage: function(req, res) {
    res.render('user/adminEnter', {
      title: '添加用户',
      user: {}
    })
  },
  /**
   * 设置用户日志等级
   */
  addUser: function(req, res, next) {
    var userObj = req.body.user;
    var _user = new User(userObj);

    _user.save(function (err, user) {
      if (err) console.log(err);
      res.redirect('/user/list');
    })
  },
  /**
   * 展示用户列表
   */
  userList: function (req, res) {
    User.fetch(function (err, users) {
      if (err) return;
      res.render('user/list', {
        title: '用户管理页',
        users: users
      })
    })
  },
  /**
   * 删除用户
   */
  deleteUser: function (req, res) {
    var id = req.query._id;
    if (!id) return;
    console.log('####')
    console.log(req.query)
    User.remove({_id: id}, function (err, users) {
      if (err) {
        console.log(err)
      } else {
        res.json({code: 0, msg: 'success'})
      }
    })
  },
  /**
   * 获取修改用户页面
   */
  updatePage: function (req, res) {
    var id = req.params.id;
    if (id) {
      User.findById(id, function (err, user) {
        res.render('user/adminUpdate', {
          title: '修改用户信息',
          user: user
        })
      })
    }
  },
  /**
   * 修改提交逻辑
   */
  updateUser: function (req, res) {
    var id = req.body.user._id;
    var userObj = req.body.user;
    var _user;
    User.findById(id, function (err, user) {
      if (err) console.log(err);
      _user = _.extend(user, userObj);
      _user.save(function (err, user) {
        res.redirect('/user/list')
      })
    })
  }
};
