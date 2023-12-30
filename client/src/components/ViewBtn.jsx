import './ViewBtn.css'
export default function ViewBtn({path, content}){
    console.log(path);
    return <button onClick={()=>{window.location.href=path}} className="btn btn-dark">{content}</button> 
};