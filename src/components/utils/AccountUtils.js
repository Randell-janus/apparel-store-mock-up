import { SaveHeroIcon } from "./Icons";

export const AccountCard = ({ children, disabled, footer, buttonText }) => {
  return (
    <>
      <main className="bg-white py-8 rounded-tl rounded-tr border border-b-0 space-y-5 h-4/5">
        {children}
      </main>
      <footer className="border rounded-b bg-gray-100">
        <div className="mx-8 py-4 flex items-center justify-between space-x-3">
          <p className="px-2">{footer}</p>
          <button
            className="btn-primary-filled"
            disabled={disabled}
            type="submit"
          >
            <p>{buttonText}</p>
          </button>
        </div>
      </footer>
    </>
  );
};

export const AccountInput = ({
  title,
  label,
  type,
  innerRef,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="px-8 space-y-2 flex flex-col">
      <h3 className="font-medium">{title}</h3>
      <label>{label}</label>
      <input
        className="input-outline w-full sm:w-3/4 md:w-3/5 lg:w-3/4"
        type={type}
        ref={innerRef}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};
