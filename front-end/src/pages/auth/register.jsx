import CommonForm from "@/components/common/form";
import { registrationFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  username: "",
  password: "",
  email: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const buttonText = "Đăng ký";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(registerUser(formData));
    if (registerUser.rejected.match(resultAction)) {
      toast.error("Đăng ký thất bại");
      setErrors(resultAction.payload); // Set errors if registration fails
    } else {
      setErrors({});
      toast.success(resultAction?.payload?.message); // Show success toast();
      navigate("/auth/login");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Đăng ký
        </h1>
        <CommonForm
          formData={formData}
          setFormData={setFormData}
          buttonText={buttonText}
          onSubmit={handleSubmit}
          formControls={registrationFormControls}
          errors={errors}
        />
        <p className="mt-2">
          Đã có tài khoản?{" "}
          <Link
            className="font-semibold text-primary hover:underline"
            to="/auth/login"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthRegister;
