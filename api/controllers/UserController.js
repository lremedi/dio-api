/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {
  
  'new': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {
      id:req.param('id'),
      id_parent:req.param('id_parent'),
      first_name:req.param('first_name'),
      last_name:req.param('last_name'),
      birth_date:req.param('birth_date'),
      email:req.param('email'),
      password:req.param('password'),
      created:new Datetime(),
      modified:new Datetime()
    }

    // Create a User with the params sent from 
    // the sign-up form --> new.ejs
    User.create(paramObj, function userCreated(err, user) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        return res.redirect('/user/new');
      }

      // res.json(user);
      res.redirect('/user/show/' + user.id);

    });
  },

  show: function(req, res, next) {
    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next();

      // res.json(user);
      res.view({
        user: user
      });
    });
  },

  index: function(req, res, next) {
    User.find(function foundUsers(err, users) {
      if (err) return next(err);
      
      res.view({
        users: users
      });
    });
  },

  edit: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);
      if (!user) return next('user doesn\'t exist.');

      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next) {

    var paramObj = {

      id: req.param('id'),

      id_parent: req.param('id_parent'),

      name: req.param('name'),

      lastname: req.param('lastname'),

      birthdate: req.param('birthdate'),

      email: req.param('email'),

    }

    User.update(req.param('id'), paramObj, function userUpdated(err) {
      if (err) {
        console.log(err);

        req.session.flash = {
          err: err
        }

        return res.redirect('/user/edit/' + req.param('id'));
      }

      res.redirect('/user/show/' + req.param('id'));
    });
  },

  destroy: function(req, res, next) {

    User.findOne(req.param('id'), function foundUser(err, user) {
      if (err) return next(err);

      if (!user) return next('User doesn\'t exist.');

      User.destroy(req.param('id'), function userDestroyed(err) {
        if (err) return next(err);
    });        

      res.redirect('/user');

    });
  }
};