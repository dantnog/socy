import InputProps from "../types/InputProps"

function Input({name, type, placeholder, value, onChange}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange({type: name, payload: e.target.value})}
      className="bg-gray-100 dark:bg-gray-800 py-1 px-2 rounded-md outline-none
        focus:ring-4 ring-yellow-300 dark:ring-yellow-600"
    />
  )
}

export default Input