import React, { Fragment, useState } from "react";
import Notification from "./notification";
import UserMenu from "./user-menu";
import {  useNavigate } from "react-router-dom";
import {
	AlignLeft,
	Maximize2,
	Bell,
	MessageSquare,
	MoreHorizontal,
} from "react-feather";

//images
import logo from "../../../assets/images/dashboard/dimar-logo.png";
import ModalPassword from "../../auth/modal-password/modal-password";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../../constants/user-data";

const Header = () => {
	const history = useNavigate();
	const [sidebar, setSidebar] = useState(true);
	const [rightSidebar, setRightSidebar] = useState(true);
	const [navMenus, setNavMenus] = useState(false);
	const { userData } = useContext(UserContext)

	//Modal Open
	const [mOpen, setMOpen] = useState(false)
	const handleModalChange = (newValue) => {
		setMOpen(newValue)
	}	

	const toggle = () => {
		// setNavMenus((prevState) => ({
		// 	navMenus: !prevState.navMenus,
		// }));
		setNavMenus(!navMenus)
	}

	const showRightSidebar = () => {
		if (rightSidebar) {
			setRightSidebar(false);
			document.querySelector(".right-sidebar").classList.add("show");
		} else {
			setRightSidebar(true);
			document.querySelector(".right-sidebar").classList.remove("show");
		}
	}
	const openCloseSidebar = () => {
		if (sidebar) {
			setSidebar(false);
			document.querySelector(".page-main-header").classList.add("open");
			document.querySelector(".page-sidebar").classList.add("open");
			document.querySelector(".footer").classList.add("open");
		} else {
			setSidebar(true);
			document.querySelector(".page-main-header").classList.remove("open");
			document.querySelector(".page-sidebar").classList.remove("open");
			document.querySelector(".footer").classList.remove("open");
		}
	}
	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/dashboard`);
	}

	const savedData = JSON.parse(localStorage.getItem('DMRPPSRDT'))

	//Change password
	useEffect(()=>{
		if(userData){
			if(userData.ced === userData.usna){
				handleModalChange(true)
			}
		}else{
			if(savedData.ced === savedData.usna){
				handleModalChange(true)
			}
		}
	},[])

	return (
		<Fragment>
			{/* open */}
			<div className="page-main-header ">
				<div className="main-header-right row">
					<div className="main-header-left d-lg-none col-auto">
						<div className="logo-wrapper">
							<a href="">
								<img className="blur-up lazyloaded" src={logo} alt="" style={{height: '40px'}} onClick={() => routeChange()}/>
							</a>
						</div>
					</div>
					<div className="mobile-sidebar col-auto p-0">
						<div className="media-body text-end switch-sm">
							<label className="switch">
								<a href="#javaScript" onClick={openCloseSidebar}>
									<AlignLeft />
								</a>
							</label>
						</div>
					</div>
					<div className="nav-right col">
						<ul className={"nav-menus " + (navMenus ? "open" : "")}>													
							<li className="onhover-dropdown">
								<Bell />
								<span className="badge rounded-pill badge-primary pull-right notification-badge">
									3
								</span>
								<span className="dot"></span>
								<Notification />
							</li>
							<li style={{cursor: 'pointer'}}>
								<a onClick={showRightSidebar}>
									<MessageSquare />
									<span className="dot"></span>
								</a>
							</li>
							<UserMenu />
						</ul>
						<div
							className="d-lg-none mobile-toggle pull-right"
							onClick={() => toggle()}
						>
							<MoreHorizontal />
						</div>
					</div>
				</div>
			</div>
			<ModalPassword isOpen={mOpen} onChange={handleModalChange}/>
		</Fragment>
	);
};

export default Header;
