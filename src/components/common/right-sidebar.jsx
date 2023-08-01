import React from "react";

// imgaes import
import user from "../../assets/images/default/user.png";

import {  useNavigate } from "react-router-dom";


const RightSidebar = () => {
	const history = useNavigate();	

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/messages/messages`);		
	};
	return (
		<div>
			<div className="right-sidebar" id="right_side_bar">
				<div>
					<div className="container p-0">
						<div className="modal-header p-l-20 p-r-20">
							<div className="col-sm-8 p-0">
								<h6 className="modal-title font-weight-bold">Lista de usuarios</h6>
							</div>
							<div className="col-sm-4 text-end p-0">
								<i className="me-2" data-feather="settings"></i>
							</div>
						</div>
					</div>
					<div className="friend-list-search mt-0">
						<input type="text" placeholder="Buscar usuario" />
						<i className="fa fa-search"></i>
					</div>
					<div className="p-l-30 p-r-30">
						<div className="chat-box">
							<div className="people-list friend-list">
								<ul className="list">
									<li className="clearfix" onClick={routeChange} style={{cursor: 'pointer'}}>
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle online"></div>
										<div className="about">
											<div className="name">Edison Garzon</div>
											<div className="status"> Online</div>
										</div>
									</li>
									<li className="clearfix" onClick={routeChange}>
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle away"></div>
										<div className="about">
											<div className="name">Ain Chavez</div>
											<div className="status"> hace 28 minutos</div>
										</div>
									</li>
									<li className="clearfix">
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle online"></div>
										<div className="about">
											<div className="name">Kori Thomas</div>
											<div className="status"> Online</div>
										</div>
									</li>
									<li className="clearfix">
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle online"></div>
										<div className="about">
											<div className="name">Erica Hughes</div>
											<div className="status"> Online</div>
										</div>
									</li>
									<li className="clearfix">
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle offline"></div>
										<div className="about">
											<div className="name">Ginger Johnston</div>
											<div className="status"> hace 2 minutos</div>
										</div>
									</li>
									<li className="clearfix">
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle away"></div>
										<div className="about">
											<div className="name">Prasanth Anand</div>
											<div className="status"> hace 2 horas</div>
										</div>
									</li>
									<li className="clearfix">
										<img
											className="rounded-circle user-image"
											src={user}
											alt=""
										/>
										<div className="status-circle online"></div>
										<div className="about">
											<div className="name">Hileri Jecno</div>
											<div className="status"> Online</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RightSidebar;
