exports.authUser = {
  requireLogin : (req, res, next) => {
    if(req.session && req.session.userId){
      next()
    }
    else{
      let err = new Error("Yoy must be loggedIn to view this page")
      err.status = 401;
      res.redirect('/login')
    }

  }

}