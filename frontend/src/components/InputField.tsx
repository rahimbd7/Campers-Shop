interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField = ({ label, type, name, value, onChange, placeholder }: InputProps) => {
  return (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    </div>
  );
};

export default InputField;
