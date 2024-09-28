import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  errors,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const renderInputByComponentType = (control) => {
    let element = null;
    const value = formData[control.name] || "";

    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (size) => {
      setFormData((prevData) => {
        const selectedSizes = prevData[control.name] || [];
        if (selectedSizes.includes(size)) {
          return {
            ...prevData,
            [control.name]: selectedSizes.filter((s) => s !== size),
          };
        } else {
          return { ...prevData, [control.name]: [...selectedSizes, size] };
        }
      });
    };

    switch (control.componentType) {
      case "input":
        element = (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) => {
              setFormData({ ...formData, [control.name]: value });
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={control.label} />
            </SelectTrigger>
            <SelectContent>
              {control.options && control.options.length > 0
                ? control.options.map((optionItem) => (
                    <SelectItem key={optionItem.id} value={optionItem.id} />
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={control.name}
            placeholder={control.placeholder}
            id={control.id}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
      case "checkbox":
        element = (
          <div className="flex flex-wrap gap-2">
            {control.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  checked={value.includes(option.id)}
                  onCheckedChange={() => handleCheckboxChange(option.id)}
                />
                <label htmlFor={option.id}>{option.label}</label>
              </div>
            ))}
          </div>
        );
        break;
      default:
        element = (
          <Input
            name={control.name}
            type={control.type}
            placeholder={control.placeholder}
            id={control.name}
            value={value}
            onChange={handleInputChange}
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-4">
        {formControls.map((control) => (
          <div key={control.name} className="grid w-full gap-1.5">
            <Label className="mb-1 text-start">{control.label}</Label>
            {renderInputByComponentType(control)}
            {errors && errors[control.name] && (
              <p className="text-red-500 text-start my-1 text-sm font-semibold">
                {errors[control.name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Gửi"}
      </Button>
    </form>
  );
};

export default CommonForm;
