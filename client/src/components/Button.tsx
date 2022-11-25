import ButtonProps from "../types/ButtonProps"

function Button({name, type, onClick, theme, children}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={() => onClick ? onClick() : null} 
      className={`py-1 px-2 rounded-md outline-none focus:ring-4 ring-yellow-500/50 
        ${ theme === 1 
          ? "bg-yellow-300 dark:bg-yellow-700 hover:bg-yellow-400 dark:hover:bg-yellow-600 text-gray-800 dark:text-gray-100"
          : theme === 2 
          ? "w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600" 
          : ""
        } `}
    >
      {name && name}{children && children}
    </button>
  )
}

export default Button