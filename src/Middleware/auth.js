const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (isAuthorized) {
    next();
  } else {
    res.status(400).send("Unauthorized");
  }
};

const userAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (isAuthorized) {
    next();
  } else {
    res.status(400).send("Unauthorized");
  }
};

module.exports = { adminAuth, userAuth };
