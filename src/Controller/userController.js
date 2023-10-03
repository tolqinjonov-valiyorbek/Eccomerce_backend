const User = require("../models/User");
const { generateRefreshToken } = require("../config/refreshtoken");
const { generateToken } = require("../config/jwtToken");
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !password || !email) {
      return res.status(400).send({
        message: "Malumotlarni to'liq kiriting!",
      });
    }

    // Check if user already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).send({
        message: "Bu foydalanuvchi nomi allaqachon mavjud!",
      });
    }

    // Check if user with the same email already exists
    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res.status(400).send({
        message: "Bu elektron pochta allaqachon ro'yxatdan o'tgan!",
      });
    }

    // Create a new user
    const new_user = new User({
      username,
      email,
      password,
    });

    // Save the new user
    await new_user.save();

    // Send response
    return res.json(new_user);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Ichki server xatosi!",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser && (await findUser.isPasswordMatched(password))) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
          findUser.id,
          {
            refreshToken: refreshToken,
          },
          { new: true }
        );
      
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 72 * 60 * 60 * 1000,
        });
      
        res.json({
          _id: findUser?._id,
          username: findUser?.username,
          email: findUser?.email,
          token: generateToken(findUser?._id),
        });
      } else {
        // Parol noto'g'ri bo'lsa xatolikni yuborish
        return res.status(401).json({ message: "Parol noto'g'ri" });
      }
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ichki server xatosi!" });
  }
};

const views = async (req, res) => {
  try {
    const allUser = await User.find();
    if (!allUser) {
      return res.status(400).json({ message: "Foydalanuvchilar topilmadi" });
    }
    return res
      .status(200)
      .json({ message: "Barcha foydalanuvchilar", user: allUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
    });
  }
};

const view = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    //   .populate({
    //     path: "cart",
    //     model: "Cart",
    //   })
    //   .populate({
    //     path: "comments",
    //     select: "text",
    //   });

    if (!user) {
      return res.status(400).json({ message: "Foydalanuvchilar topilmadi" });
    }

    return res.status(200).json({ message: "Foydalanuvchi topildi", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
    });
  }
};

const deleted = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    res.json({ message: "Foydalanuvchi muafaqiyatli o'chirildi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        email,
        password,
      },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(400)
        .json({ message: `${(email, password)} topilmadi` });
    }
    res.status(200).json({ message: "Muafaqiyatli bajarildi", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Nimadir xato ketdi. Iltimos keyinroq qayta urinib ko'ring!",
    });
  }
};


const handleRefreshToken = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  if (!user) throw new Error(" No Refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
};

const blockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const blockusr = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    throw new Error(error);
  }
};

const unblockUser = async (req, res) => {
  const { id } = req.params;
  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "User UnBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updatePassword = async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
};

// const forgotPassword = async (req, res) => {
//     const { email } = req.body;
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.json({ message: 'User is not exist' });
//       }
  
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'youremail@gmail.com',
//           pass: 'yourpassword'
//         }
//       });
  
//       const mailOptions = {
//         from: 'youremail@gmail.com',
//         to: 'myfriend@yahoo.com',
//         subject: 'Sending Email using Node.js',
//         text: 'That was easy!'
//       };
  
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent:', info.response);
//       res.json({ message: 'Email sent' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Error occurred' });
//     }
// };
const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Foydalanuvchi mavjud emas' });
      }
  
      // Parolni tiklash uchun token yaratish
      const resetToken = generateToken(user._id);
  
      // Parolni tiklash havolasini yaratish
      const resetLink = `http://localhost:5000/api/user/reset-password?token=${resetToken}`;
  
      // E-pochta o'rnating
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'youremail@gmail.com',
          pass: 'yourpassword',
        },
      });
  
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Parolni tiklash havolasi',
        text: `Parolingizni tiklash uchun quyidagi havolani bosing: ${resetLink}`,
      };
  
      // E-pochta yuborish
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: 'E-pochta yuborildi' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Xatolik yuz berdi' });
    }
  };

const resetPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
      const hash = await bcrypt.hash(password, 10);
      await UserModel.findByIdAndUpdate(id, { password: hash });
      res.status(200).json({ message: 'Success' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occurred' });
    }
};



module.exports = {
  createUser,
  loginUser,
  views,
  view,
  deleted,
  update,
  updatePassword,
  handleRefreshToken,
  blockUser,
  unblockUser,
  forgotPassword,
  resetPassword,
};
