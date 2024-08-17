import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";

const Login = () => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const spaceRegex = /\s/;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (data.email === "" || data.password === "") {
      if (data.email === "") {
        setEmailError("Email không thể để trống");
      }

      if (data.password === "") {
        setPasswordError("Mật khẩu không thể để trống");
      }

      return;
    } else if (emailError || passwordError) {
      return;
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    if (data.email === "") {
      setEmailError("Email không thể để trống");
    } else if (!regex.test(data.email)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError(null);
    }
  }, [data.email]);

  useEffect(() => {
    if (data.password === "") {
      setPasswordError("Mật khẩu không thể để trống");
    } else if (spaceRegex.test(data.password)) {
      setPasswordError("Mật khẩu không thể chứa khoảng trắng");
    } else if (data.password.length < 6) {
      setPasswordError("Mật không thể chứa ít hơn 6 ký tự");
    } else {
      setPasswordError(null);
    }
  }, [data.password]);

  useEffect(() => {
    setEmailError(null);
    setPasswordError(null);
  }, []);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto">
            <img src={profileImg} alt="profile" />
          </div>
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="email">Email</label>
              <div
                className={
                  emailError
                    ? "rounded-lg border border-red-600 bg-slate-100 p-2"
                    : "bg-slate-100 p-2 rounded-lg"
                }
              >
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                />
              </div>
              {emailError && (
                <span className="text-red-600 font-bold">{emailError}</span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-2 mt-5">
              <label htmlFor="password">Mật khẩu</label>
              <div
                className={
                  passwordError
                    ? "rounded-lg border border-red-600 bg-slate-100 p-2 flex"
                    : "bg-slate-100 p-2 rounded-lg flex"
                }
              >
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleChange}
                  value={data.password}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {passwordError && (
                <span className="text-red-600 font-bold">{passwordError}</span>
              )}
              <Link
                to="/forgot-password"
                className="text-sm block w-fit ml-auto hover:text-blue-600 transition duration-300 ease-in-out"
              >
                Quên mật khẩu
              </Link>
            </div>

            <button
              className="bg-red-600 px-6 py-2 max-w-[150px] mx-auto block rounded-full text-white w-full mt-6 transform hover:scale-105 transition duration-300 ease-in-out transform-origin-center will-change-transform"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-center mt-5">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-red-600 transition duration-300 ease-in-out"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
