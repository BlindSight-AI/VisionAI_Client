import { Component } from "react";
import "./navbarStyles.css";
import { MenuItems } from "./Manuitems";
import {Link} from "react-router-dom";
class Navbar extends Component {
    state ={clicked: false};
    handleClick =() =>{
        this.setState({clicked: !this.state.clicked})
    }
    render(){
        return(
            <nav className="NavbarItems">

                <a href="/"><h1 className="navbar-logo">Logo</h1></a>
                                       
                <div className="menu-icons" onClick={this.handleClick} >
                    <i className={this.state.clicked ? "fas fa-times " : "fas fa-bars " } style={{color:"white"}}></i>
                    

                    
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu "}>
                    {MenuItems.map((item,index) =>{
                        return(
                            <li key={index}>
                                <Link className={item.cName} to={item.url}> 
                                <i className={item.icon}></i>{item.title} 
                                </Link>
                            </li>
                        );
                    }
                    )}
                    
                    <a href="/signup"><button id="nav-btn" >Sign Up</button></a>
                </ul>

            </nav>



        );
    }
}


export default Navbar;