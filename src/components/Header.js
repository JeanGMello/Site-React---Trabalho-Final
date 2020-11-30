import React from 'react'
import {Link} from 'react-router-dom'

function Header(){
    return (
        <header id="header">
				<div className="inner">
					<Link to="/" className="logo">THE LAST FANDOM</Link>
					</div>
			</header>
    )
}
export default Header;