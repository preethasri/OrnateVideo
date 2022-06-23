import React,{useState} from 'react'
import './SignUpPage.css'
import { Navbar } from '../../../Components/ComponentsExport'
import { Link, useNavigate } from 'react-router-dom'
import { useTogglePassword } from '../Hooks/TogglePassword'
import { useForm } from '../Hooks/useForm'
import { useAuth } from '../../../Context'
import { SignUpService } from '../../../Services/ServiceExport'
import { toast } from 'react-hot-toast'

const SignUpPage=()=>{
    const {togglePassword,passwordToggle,confirmPasswordToggle,confirmTogglePassword}=useTogglePassword();
    const {formData,formHandler,error}=useForm()
    const navigate=useNavigate();
    const{auth,setAuth}=useAuth();
    const signupHandler=async()=>{
        try{
            setAuth({
               isAuthenticated:false,
               user:"",
               token:"",
            })
            const response=await SignUpService(formData)
            console.log(response.status)
            if(response.status===200){
                localStorage.setItem("AUTH_TOKEN",response.data.encodedToken)
                localStorage.setItem("Ornate_user",JSON.stringify(response.data.foundUser))
            }
            setAuth(a=>({
                ...a,
                isAuthenticated:true,
                user:response.data.foundUser,
                token:response.data.encodedToken
            }))
            navigate("/")
            toast.success(`welcome ${response.data.foundUser.firstName}`)
            
        }
        catch(err){
            console.log(error)
        }

    }
    return(
        <div>
            <Navbar />
             <form   onSubmit={(e)=>e.preventDefault()}>
        <div className="form">
            <div className="sign-up-form">
                <h2>Create Account</h2>
               
                <label for="firstName">Name
        <input type="text"
        placeholder="enter your name" 
        required
        name='firstname' 
        onChange={formHandler} 
         />
       </label>

            
                <label for="email-id">Email-id
        <input type="text" 
        placeholder="enter your mail address" 
        required
        name="email-id" 
        onChange={formHandler}
         />
       </label>
                <label for="password">Password
        <input 
        placeholder="enter your password" 
        name="password"
        required 
        id="password"
        type={passwordToggle.type}
        onChange={formHandler} 
         />
        {passwordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={togglePassword} >visibility</span>) :(<span className="material-icons-outlined" id="eye-icon-slash" onClick={togglePassword}>visibility_off</span>)}

        <br></br>
       </label>
                <label for="confirmPassword" className="confirm-password">Confirm-password
        <input 
        
        placeholder="confirm your password" 
        name="confirmPassword" 
        required
        id="confirmPassword"
        type={confirmPasswordToggle.type}
        onChange={formHandler} 
         />
        {confirmPasswordToggle.isEyeIcon ? (<span className="material-icons-outlined" id="eye-icon"  onClick={confirmTogglePassword} >visibility</span>) :(<span className="material-icons-outlined" id="eye-icon-slash" onClick={confirmTogglePassword} >visibility_off</span>)}
       <div>
        {error.isMatch && <span className="error">{error.isMatch}</span>}
        </div>
       </label>
                <button className="login-form-link"  type='submit' onClick={signupHandler}>Continue
      </button>
            </div>
        </div>
    </form>
    <div className="login-form-info">
        <span>Already have an account? 
        <Link to="/login" >
            <button className="signup" >Login</button>
        </Link>
        </span>
    </div>
   
    
        </div>
    )
}



export {SignUpPage}