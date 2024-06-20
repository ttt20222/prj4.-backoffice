const tempLogin = async (req, res, next) => {
  const user1 = {
    userId: 1,
  };

  const user2 = {
    userId: 2,
  };

  req.user = user1;
};

export { tempLogin };
