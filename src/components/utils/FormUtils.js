import { Link } from "react-router-dom";

export const FormLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export const FormHeading = ({ header, subheader }) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      {/* LOGO */}
      <Link to="/" className="text-center">
          <img src="apxLOGO.svg" alt="apx logo" className="w-16 h-16" />
      </Link>
      <h1 className="font-medium">{header}</h1>
      <p>{subheader}</p>
    </div>
  );
};

export const FormInput = ({
  label,
  type,
  innerRef,
  value,
  onChange,
  passwordCondition,
}) => {
  return (
    <div className="space-y-2">
      <div className="3sm:flex justify-between items-center">
        <label className="font-medium">{label}</label>
        <p className="font-light text-gray-400 text-xs md:text-sm">
          {passwordCondition}
        </p>
      </div>
      <input
        className="input-outline w-full"
        type={type}
        ref={innerRef}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export const FormFooter = ({ footer, to, type }) => {
  return (
    <div className="text-center">
      <p className="mb-4">
        {footer}{" "}
        <Link to={to} className="text-link">
          {type}
        </Link>
      </p>
      <Link to="/" className="text-link">
        Cancel
      </Link>
    </div>
  );
};
