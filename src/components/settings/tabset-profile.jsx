import React, { useContext } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Button, Row, Table } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import { UserContext } from "../../constants/user-data";
import BuildingComp from "../common/utils/building/building-comp";


const TabsetProfile = () => {
	const history = useNavigate();	
	const {userData} = useContext(UserContext)

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/settings/edit-user`);		
	};

	return (
		<div>
			<Tabs>
				<TabList className="nav nav-tabs tab-coupon">
					<Tab className="nav-link">
						<User className="me-2" />
						Perfil
					</Tab>
					<Tab className="nav-link">
						<Settings className="me-2" />
						Configuraciones
					</Tab>
				</TabList>

				<TabPanel>
					<div className="tab-pane fade show active">
						<h5 className="f-w-600 f-16">Profile</h5>
						<div className="table-responsive profile-table">
							<Table className="table-responsive">
								<tbody>
									<tr>
										<td>Nombre: </td>
										<td>{userData ? userData.name:'S/I'}</td>
									</tr>
									<tr>
										<td>Cargo: </td>
										<td>{userData ? userData.cargo:'S/I'}</td>
									</tr>
									<tr>
										<td>Email: </td>
										<td>{userData ? userData.email:'S/I'}</td>
									</tr>
									<tr>
										<td>Genero: </td>
										<td>{userData ? (userData.gender ? userData.gender : 'S/I'):'S/I'}</td>
									</tr>
									<tr>
										<td>Celular: </td>
										<td>{userData ? (userData.phone ? userData.phone : 'S/I'):'S/I'}</td>
									</tr>
									<tr>
										<td>Fecha de Nacimiento: </td>
										<td>{userData ? (userData.birth ? userData.birth : 'S/I'):'S/I'}</td>
									</tr>
									<tr>
										<td>Sucursal: </td>
										<td>{userData ? (userData.suc === 'AMB' ? 'Ambato' : 'Guayaquil'):'S/I'}</td>
									</tr>
									<tr>
										<td>Direccion: </td>
										<td>{userData ? (userData.dir ? userData.dir : 'S/I'):'S/I'}</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
					<div className="account-setting deactivate-account">						
						<Button type="button" color="primary" onClick={routeChange}>
							Editar Perfil
						</Button>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <div className="tab-pane fade"> */}					
					<div className="account-setting deactivate-account">
						<Row>
							<BuildingComp/>
						</Row>						
					</div>					
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default TabsetProfile;
