import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";

const Login = () => {
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [email, setEmail] = useState("example@ex.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const regex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const handleLogin = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (email.trim() === "") {
      setEmailError("Email không thể để trống");
    } else if (!regex.test(email)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError(null);
    }
    if (password.trim() === "") {
      setPasswordError("Mật khẩu không thể để trống");
    } else if (password.length < 6) {
      setPasswordError("Mật không thể chứa ít hơn 6 ký tự");
    } else {
      setPasswordError(null);
    }
  }, [email, password]);

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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            {emailError && (
              <span className="text-red-600 font-bold">{emailError}</span>
            )}
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
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <Link
                to="/forgot-password"
                className="block w-fit ml-auto hover:text-blue-600"
              >
                Quên mật khẩu
              </Link>
            </div>
            {passwordError && (
              <span className="text-red-600 font-bold">{passwordError}</span>
            )}

            <button
              className="bg-red-600 px-6 py-2 max-w-[150px] mx-auto block rounded-full text-white w-full mt-4 transform hover:scale-105 transition duration-300 ease-in-out transform-origin-center will-change-transform"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-center mt-5">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-800 hover:text-blue-400">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
