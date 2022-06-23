import React,{useState} from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { SEARCH_TERM } from '../../reducers/constants'
import { useAuth } from '../../Context'
import { LogOutService } from '../../Services/AuthServices/logoutService'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
const Navbar=({filtersState,filterDispatch})=>{
    const [searchInput,setSearchInput]=useState("")
    const {
        auth:{isAuthenticated,user},setAuth
    }=useAuth();
    const {pathname}=useLocation()
        return(
            <>
            <div className='navbar-container'>
                <div className='navbar-wrapper'>
                    <div className='navbar-left'>
                        <div className="nav-item">
                        <NavLink to="/" className="link-tag">
                        <div className='brand-name'>Ornate Videos</div>
                    
                        </NavLink>
                          
                        </div>
                       
                    </div>
                    {pathname==="/" &&(
                        <div className='navbar-center'>
                        <div className='navbar-search'>
                         <input className='search-input' placeholder='search for videos...'  value={searchInput}  onChange={e => {
                       setSearchInput(e.target.value);
                       filterDispatch({ type: SEARCH_TERM, payload: e.target.value });
                      }}
                           />
                        
                        <button className="search-btn">
                           <span className='material-icons-outlined'>search</span>
                          
                        </button>
                         
                         
                     
                        </div>
                    </div>

                    )}
                    
                    
                    <div className='navbar-right'>
    
                       
                       
                       <div className="nav-item">
                          {!isAuthenticated &&(
                              <>
                              <NavLink to ="/login" className="nav-login" >
                                  <span className='material-icons'>login</span>
                              </NavLink>
                              </>

                          )}
                          {isAuthenticated &&(
                              <>
                              <div className="nav-user-and-logout">
                              <NavLink to="/"  className='link-tag '>
                                 <div className='user-name'> welcome!</div>

                              </NavLink>
                              <div>
                              <button className='nav-logout' onClick={()=>{
                                  LogOutService();
                                  setAuth({
                                      isAuthenticated:false,
                                      user:"",
                                      token:"",
                                  })
                                  toast.success("LoggedOut successfully")
                                  navigate("/")
                              }}>
                                 <span className="material-icons">logout</span>

                              </button>
                              </div>
                              </div>
                              </>
                          )}
                              
    
                       </div>
                    
                       
                        
                 </div>
                </div>
                </div>
                </>
    
        )
    

}

export {Navbar}