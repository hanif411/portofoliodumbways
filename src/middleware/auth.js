export const userIsLogin = (req, res, next) => {
  const user = req.session.user;
  if (user) {
    return next();
  }
  res.render("login", {
    errormessage: "belum ada user yang login silahkan login dahulu",
  });
};
