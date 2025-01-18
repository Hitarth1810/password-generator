
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length,setLength]=useState(8);
  const[number,setNumber]=useState(false);
  const[char,setChar]=useState(false);
  const[password,setPassword]=useState("");

  const passwordRef=useRef(null)

  const passwordgenerator= useCallback(()=>{ //if any of the dependencies is changed then it will call function again usinf useCallBack
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(number) str+="0123456789"
    if(char) str+="!@#$%^&*-_+=[]{}~`"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length + 1) //generates random index number
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,number,char,setPassword]) //dependencies 

  const copyPasswordToClipboard= useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=> {passwordgenerator()},[length,number,char,passwordgenerator])
  return (
    <>
   <div 
  className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-8 my-8 bg-green-800 text-center">
  <div className='text-white font-bold text-lg'>
    Password Generator
  </div>
  <div className="flex shadow rounded-lg overflow-hidden mt-3">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-2 px-3"
      placeholder="Password"
      readOnly  
      ref={passwordRef}
    />
    <button 
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 '>copy</button>
  </div>
  <div className='flex text-sm gap-x-1.5'>
    <div className='flex items-center gap-x-1'>
      <input
      type="range"
      min={8}
      max={100}
      value={length}
      className='cursor-pointer'
      onChange={(e)=>{setLength(e.target.value)}}
      />
      <label className='text-white text-lg'>Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={number}
      id='numberInput'
      onChange={()=>{setNumber((prev)=> !prev);
      }}
      />
      <label htmlFor='numberInput' className='text-white text-lg'>Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input
      type="checkbox"
      defaultChecked={char}
      id='charInput'
      onChange={()=>{setChar((prev)=> !prev);
      }}
      />
      <label htmlFor='charInput' className='text-white text-lg'>Characters</label>
    </div>
  </div>
</div>


    </>
  );
}

export default App;
