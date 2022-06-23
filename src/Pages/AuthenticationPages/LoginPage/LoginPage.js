import React ,{useState} from 'react'
import './LoginPage.css'
import { Navbar } from "../../../Components/ComponentsExport"
import { useAuth } from "../../../Context"
import { LoginService } from '../../../Services/ServiceExport'
import { toast } from 'react-hot-toast'
import { useNavigate ,Link} from 'react-router-dom'
import { useTogglePassword } from '../Hooks/TogglePassword'
const LoginPage=()=>{
    const {passwordToggle,togglePassword}=useTogglePassword();
    const {setAuth}=useAuth();
    const [signinData,setSignInData]=useState({
        email:"swetha34@gmail.com",
        password:"swetha@2",
    })
    const navigate=useNavigate()
    const [error,setError]=useState('')
    const loginHandler=async(e)=>{
        e.preventDefault();
        
            try{
                setAuth({
                    isAuthenticated:false,
                    user:"",
                    token:""
                })
                setError("")
                console.log(signinData)
                const response=await LoginService(
                   { 
                       email:signinData.email,
                    password:signinData.password,
                   }
                )
                console.log(response)
                if(response.status===200){
                        
                        localStorage.setItem("AUTH_TOKEN",response.data.encodedToken),
                        localStorage.setItem("ornate_user",JSON.stringify(response.data.foundUser))

                   setAuth(a=>({
                       ...a,
                       isAuthenticated:true,
                       user:response.data.foundUser,
                       token:response.data.encodedToken,

                   }))
                   toast.success(`welcome ${response.data.foundUser.firstName}`)
                   navigate("/")

                    
                }

            }
            catch(err){
                console.log(err)
                setError(err.response.data.errors[0])

            }
        
    }
    return(
<div>
              <Navbar />
        <form onSubmit={(e)=>e.preventDefault()}>
        <div className="form">
            <div className="login-form">
                <h2>Sign-In</h2>
                <p>{error}</p>
                <label for="email">Email <br></br>
           <input 
            value={signinData.email}
           type="email"
           placeholder="enter your mail address" 
           name="email"
           className='input'
           onChange={e=>setSignInData(values=>({...values,email:e.target.value}))}
           
           required />
         </label>
                <label for="password">Password
           <input 
           type={passwordToggle.type}
           value={signinData.password}
           name="password"
           placeholder="enter your password" 
           className="input"
           onChange={e=>setSignInData(values=>({...values,password:e.target.value}))}
           required />
         </label>
         {passwordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={togglePassword} >visibility</span>) :(<span className="material-icons" id="eye-icon-slash" onClick={togglePassword} >visibility_off</span>)}

                <div className='btns'>
                   <button onClick={loginHandler} className="sign-in-button-outlined">login with test credentials</button>
                    <button onClick={loginHandler} className="sign-in-button">login</button>
                </div>
            
            </div>
        </div>
    </form>
    <div className="sign-up-info">
        <p>new to Ornate ?</p>
        <Link to="/signup" >
            <button className="sign-up-button">create your Ornate account</button>
        </Link>
       
        
    
    </div>

    </div>
    )
}
export {LoginPage}