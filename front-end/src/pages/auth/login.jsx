import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  password: "",
  email: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const buttonText = "Đăng nhập";
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const onSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(formData));
    if (loginUser.rejected.match(resultAction)) {
      toast.error("Đăng nhập thất bại");
      setErrors(resultAction.payload); // Set errors if registration fails
    } else {
      setErrors({});
      toast.success(resultAction?.payload?.message); // Show success toast();
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Đăng nhập
        </h1>
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          buttonText={buttonText}
          onSubmit={onSubmit}
          formControls={loginFormControls}
          errors={errors}
        />
        <p className="mt-2">
          Chưa có tài khoản?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            to="/auth/register"
          >
            Đăng ký
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthLogin;
