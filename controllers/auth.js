const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      isAuthenticated: false
    });
  };

exports.postLogin = (req, res, next) => {
    User.findById('5c7ce58b4fe44c14d8526414')
        .then(user => {
            req.session.isLoggedIn = true;
            req.session.user = user;
            console.log(req.session.user._id);
            res.redirect('/');
        });
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    User.findOne(email)
        .then(userDoc => {
            if(userDoc) {
                return res.redirect('/signup');
            }
            const user = new User({
                email: email,
                password: password,
                cart: {items: []}
            });
            return User.addToDb(user);
        })
        .then(result => { 
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};