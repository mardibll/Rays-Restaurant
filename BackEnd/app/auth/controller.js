const User = require("../user/model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getToken } = require("../utils");
const register = async (req, res, next) => {
  try {
    let payload = req.body;
    let user = new User(payload);
    await user.save();
    return res.json(user);
  } catch (err) {
    if (err && err.name === "ValidationError") {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

const localStrategy = async (email, password, done) => {
  try {
    let user = await User.findOne({ email }).select(
      "-__v -createdAt -updatedAt -cart_items -token"
    );

    if (!user) return done();

    if (bcrypt.compareSync(password, user.password)) {
      // Jika kata sandi cocok, kembalikan pengguna tanpa informasi sensitif (password dan lainnya)
      const { password, ...userWithoutPassword } = user.toJSON();
      return done(null, userWithoutPassword);
    } else {
      // Jika kata sandi tidak cocok, kembalikan null tanpa kesalahan
      return done();
    }
  } catch (err) {
    // Tangani kesalahan jika terjadi
    done();
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    console.log(user, "INI USER");
    try {
      if (err) next(err);
      if (!user) {
        return res
          .status(400)
          .json({ error: 1, message: "Email or Password incorrect" });
      }
      // Autentikasi berhasil, buat dan kirimkan token sebagai respons
      let signed = jwt.sign(user, config.secretKey);

      // Simpan token dalam database, dalam contoh ini, kita menggunakan MongoDB dan Mongoose
      // Pastikan Anda telah mengimpor model User dan memiliki skema yang sesuai
      await User.findByIdAndUpdate(user._id, {
        $push: { token: signed },
      });

      // Kirimkan token sebagai respons
      res.json({
        message: "LOGIN SUCCESSFULLY",
        user,
        token: signed,
      });
    } catch (err) {
      // Tangani kesalahan jika terjadi
      console.error(err);
      res.status(500).json({ error: 1, message: "Something went wrong" });
    }
  })(req, res, next);
};
const logOut = async (req, res, next) => {
  let token = getToken(req);
  let user = await User.findOneAndUpdate(
    { token: { $in: [token] } },
    { $pull: { token: token } },
    { useFindAndModify: false }
  );
  if (!token || !user) {
    return res.status(401).json({
      error: 1,
      message: "No User Found !!",
    });
  }

  return res.json({
    error: 0,
    message: "Logout berhasil !!",
  });
};
const me = (req, res, next) => {
  if (!req.user) {
    res.send(401, "invalid token...");
  }
  res.json(req.user);
};
module.exports = { register, localStrategy, login, logOut, me };
