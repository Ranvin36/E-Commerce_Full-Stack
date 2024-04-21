import React, { useState } from "react"

interface InputFieldProps{
    title:string,
    type:string,
    onChange: (value:string) => void;
}

const InputFields : React.FC<InputFieldProps> = ({title,type,onChange}) =>{
    const[focused ,setFocused] = useState<boolean>(false)
    return(
        <div className= "input-fields">
            <p>{title}</p>
            <input style={{borderWidth: focused ? 2 :1, borderColor:focused?"pink":"#777"}} type={type} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={(e)=>onChange(e.target.value)}/>
        </div>
    )
}

export default InputFields
