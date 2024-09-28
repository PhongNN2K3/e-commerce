import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register
const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    let errors = {};

    // Username validation
    if (username === "") {
      errors.username = "Tên tài khoản không được để trống.";
    } else if (!usernameRegex.test(username)) {
      errors.username = "Tên tài khoản không hợp lệ.";
    }

    // Email validation
    if (email === "") {
      errors.email = "Email không được để trống.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email không hợp lệ.";
    }

    // Password validation
    if (password === "") {
      errors.password = "Mật khẩu không được để trống.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Mật khẩu phải gồm ít nhất 8 ký tự, chứa chữ và số.";
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      errors.username = "Tên người dùng đã tồn tại.";
    }

    // Check for existing email
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      errors.email = "Email đã đăng ký.";
    }

    // If there are any errors, return them all at once
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Đăng ký thất bại.",
        success: false,
        error: true,
        errors: errors, // Return all accumulated errors
      });
    }

    // Hash password and save new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "Đăng ký thành công!",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Đã xảy ra lỗi server.",
      success: false,
      error: true,
    });
  }
};

//login
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    let errors = {};
    const user = await User.findOne({ email });

    // Email validation
    if (email === "") {
      errors.email = "Email không được để trống.";
    } else if (!emailRegex.test(email)) {
      errors.email = "Email không hợp lệ.";
    }

    // Password validation
    if (password === "") {
      errors.password = "Mật khẩu không được để trống.";
    } else if (!passwordRegex.test(password)) {
      errors.password = "Mật khẩu phải gồm ít nhất 8 ký tự, chứa chữ và số.";
    }

    // Check if user exists, only if there are no email validation errors
    if (!errors.email) {
      if (!user) {
        errors.email = "Tài khoản không tồn tại, vui lòng đăng ký tài khoản.";
      } else {
        // If user exists, check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          errors.password = "Sai mật khẩu.";
        }
      }
    }

    // If there are any errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(401).json({
        message: "Đăng nhập thất bại.",
        success: false,
        error: true,
        errors: errors, // Return all accumulated errors
      });
    }

    // If no errors, generate token and log the user in
    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      "CLIENT_SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      message: "Đăng nhập thành công!",
      success: true,
      error: false,
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Đã xảy ra lỗi server.",
      success: false,
      error: true,
    });
  }
};

//logout
const logoutController = async (req, res) => {
  try {
    res.clearCookie("token").json({
      message: "Đăng xuất thành công!",
      success: true,
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      success: false,
      error: true,
    });
  }
};

//middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Người dùng chưa xác thực.",
        success: false,
        error: true,
      });
    }

    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Đã xảy ra lỗi server.",
      success: false,
      error: true,
    });
  }
};

export {
  authMiddleware,
  loginController,
  logoutController,
  registerController,
};
