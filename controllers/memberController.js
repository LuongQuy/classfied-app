var passport = require('passport');

exports.get_register = function(req, res, next) {
    var messages = req.flash('error');
    res.render('frontend/member/register', {   
        pageTitle: req.__('Member Register'),
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}

// POST Register
exports.post_register = passport.authenticate('local.register', {
    successRedirect: '/thanh-vien/tai-khoan',
    failureRedirect: '/thanh-vien/dang-ky',
    failureFlash: true
});

// GET profile
exports.get_profile = function(req, res, next){
    res.render('frontend/member/dashboard', {
        pageTitle: req.__('Dashboard')
    });
}

// GET profile
exports.get_login = function(req, res, next){
    var messages = req.flash('error');
    res.render('frontend/member/login', {
        pageTitle: req.__('Login'),
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}

// POST profile
exports.post_login = passport.authenticate('local.login', {
    successRedirect: '/thanh-vien/tai-khoan',
    failureRedirect: '/thanh-vien/dang-nhap',
    failureFlash: true
});

// GET logout
exports.get_logout = function(req, res, next){
    req.logout();
    res.redirect('/');
};

//
exports.isLogedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/thanh-vien/dang-nhap');
};

exports.notLogedIn = function(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    res.redirect('/thanh-vien/tai-khoan');
};

exports.notLogin_use = function(req, res, next){
    next();
}