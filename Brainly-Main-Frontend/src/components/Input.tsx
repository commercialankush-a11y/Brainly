
export function Input({  placeholder,refrences}:{ placeholder:string;
    refrences ?: any }){

    return <div>
        <input ref={refrences} placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}