import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../constants/user-data";
import man from "../../../assets/images/default/user.png";

const UserPanel = () => {
	const { userData } = useContext(UserContext)
	return (
		<div>
			<div className="sidebar-user text-center">
				<div>
					<img
						src={man}
						className="img-60 rounded-circle lazyloaded blur-up"
					/>
				</div>
				<h6 className="mt-3 f-14">{userData ? userData.name : 'Usuario'}</h6>
				<p>{userData ? userData.cargo : 'Asistente'}</p>
			</div>
		</div>
	);
};

export default UserPanel;
