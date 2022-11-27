import FileInputProps from "../types/FileInputProps"


function File({id, name, onChange}: FileInputProps) {
  return (
    <input 
      type="file" 
      name={name}
      id={id}
      onChange={e => onChange({type: 'image', payload: e.target.files[0]})}
      className="file:mr-4 file:py-1.5 file:px-4 file:rounded-md file:border-0 file:text-sm 
      file:font-semibold file:bg-gray-100 file:text-yellow-600 hover:file:bg-gray-200
      file:dark:bg-gray-800 file:dark:hover:bg-gray-700"
    />
  )
}

export default File