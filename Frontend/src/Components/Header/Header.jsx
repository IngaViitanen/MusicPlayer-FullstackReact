import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiContants';
import './Header.css';

function Header(props) {

    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    
    //adding logout button to end user session and redirect the user back to the login page
    //renderLogout displays logout button in the header section if the user is on the home page
     function renderLogout() {
        if(props.location.pathname === '/home'){
            return(
                <div className="ml-auto">
                    <button className="btn-logout" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }

    //handleLogout destroys session token on the client-side and redirects user to the login page
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    
    return(
        <nav className="navbar">
            <div className="text">
                <span className="h3">{props.title || title}</span>
                {renderLogout()}
            </div>
        </nav>
    )
}
export default withRouter(Header);