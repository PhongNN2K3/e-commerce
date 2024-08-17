import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import { imageToBase64 } from "../../helpers/imageToBase64";

const Register = () => {
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmedPasswordError, setConfirmedPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    avatar: "",
  });
  const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
  const spaceRegex = /\s/;
  const passwordRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadAvatar = async (e) => {
    const file = e.target.files[0];
    const avatar = await imageToBase64(file);

    setData({
      ...data,
      avatar,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      data.name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.confirmedPassword === "" ||
      data.password !== data.confirmedPassword
    ) {
      if (data.name === "") {
        setNameError("Tên không thể để trống");
      }

      if (data.email === "") {
        setEmailError("Email không thể để trống");
      }

      if (data.password === "") {
        setPasswordError("Mật khẩu không thể để trống");
      }

      if (data.confirmedPassword === "") {
        setConfirmedPasswordError("Mật khẩu không thể để trống");
      }

      if (data.password !== data.confirmedPassword) {
        setConfirmedPasswordError("Mật khẩu không chính xác");
      }

      return;
    } else if (
      nameError ||
      emailError ||
      passwordError ||
      confirmedPasswordError
    ) {
      return;
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    if (data.name === "") {
      setNameError("Tên không thể để trống");
    } else if (!nameRegex.test(data.name)) {
      setNameError("Tên không hợp lệ");
    } else {
      setNameError(null);
    }
  }, [data.name]);

  useEffect(() => {
    if (data.email === "") {
      setEmailError("Email không thể để trống");
    } else if (!passwordRegex.test(data.email)) {
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
    if (data.confirmedPassword !== data.password) {
      setConfirmedPasswordError("Mật khẩu không chính xác");
    } else {
      setConfirmedPasswordError(null);
    }
  }, [data.confirmedPassword]);

  useEffect(() => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmedPasswordError(null);
  }, []);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img
                src={data.avatar || profileImg}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <form>
              <div className="text-sm pb-4 pt-1 font-semibold bg-opacity-60 text-center bg-slate-200 absolute bottom-0 w-full">
                Tải ảnh lên
              </div>
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={handleUploadAvatar}
              />
            </form>
          </div>
          <form className="mt-5" onSubmit={handleLogin}>
            <div className="grid grid-cols-1 gap-2">
              <label htmlFor="name">Tên</label>
              <div
                className={
                  nameError
                    ? "rounded-lg border border-red-600 bg-slate-100 p-2"
                    : "bg-slate-100 p-2 rounded-lg"
                }
              >
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  value={data.name}
                />
              </div>
              {nameError && (
                <span className="text-red-600 font-bold">{nameError}</span>
              )}
            </div>
            <div className="grid grid-cols-1 gap-2 mt-5">
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
            </div>

            <div className="grid grid-cols-1 gap-2 mt-5">
              <label htmlFor="confirmedPassword">Nhập lại mật khẩu</label>
              <div
                className={
                  confirmedPasswordError
                    ? "rounded-lg border border-red-600 bg-slate-100 p-2 flex"
                    : "bg-slate-100 p-2 rounded-lg flex"
                }
              >
                <input
                  className="w-full h-full outline-none bg-transparent"
                  type={showConfirmedPassword ? "text" : "password"}
                  id="confirmedPassword"
                  name="confirmedPassword"
                  onChange={handleChange}
                  value={data.confirmedPassword}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() =>
                    setShowConfirmedPassword(!showConfirmedPassword)
                  }
                >
                  {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              {confirmedPasswordError && (
                <span className="text-red-600 font-bold">
                  {confirmedPasswordError}
                </span>
              )}
            </div>

            <button
              className="bg-red-600 px-6 py-2 max-w-[150px] mx-auto block rounded-full text-white w-full mt-6 transform hover:scale-105 transition duration-300 ease-in-out transform-origin-center will-change-transform"
              type="submit"
            >
              Đăng ký
            </button>
          </form>
          <p className="text-center mt-5">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-red-600 transition duration-300 ease-in-out"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
