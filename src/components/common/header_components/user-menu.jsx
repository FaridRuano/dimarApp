import React, { Fragment } from "react";
import { Link } from "react-router-dom";
//images import
import man from "../../../assets/images/default/user.png";
import { LogOut, User } from "react-feather";

const UserMenu = () => {
	return (
		<Fragment>
			<li className="onhover-dropdown">
				<div className="media align-items-center">
					<img
						className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded"
						src={man}
						alt="header-user"
					/>
					<div className="dotted-animation">
						<span className="animate-circle"></span>
						<span className="main-circle"></span>
					</div>
				</div>
				<ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">					
					<li>
						<Link to={`${process.env.PUBLIC_URL}/settings/profile`}>
						<User/>Perfil

						</Link>
					</li>
					<li>
						<Link to={`${process.env.PUBLIC_URL}/`} onClick={() => (
									localStorage.removeItem('DMRPPSRDT')
								)}>
							<LogOut/>Cerrar sesion
						</Link>
					</li>
				</ul>
			</li>
		</Fragment>
	);
};

export default UserMenu;
