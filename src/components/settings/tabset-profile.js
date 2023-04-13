import React from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { User, Settings } from "react-feather";
import { Button, Col, Input, Label, Row, Table } from "reactstrap";
import {  useNavigate } from "react-router-dom";


const TabsetProfile = () => {
	const history = useNavigate();	

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
										<td>Karol</td>
									</tr>
									<tr>
										<td>Apellido: </td>
										<td>Garzon</td>
									</tr>
									<tr>
										<td>Email: </td>
										<td>karol@gmail.com</td>
									</tr>
									<tr>
										<td>Genero: </td>
										<td>Femenino</td>
									</tr>
									<tr>
										<td>Celular: </td>
										<td>0999999999</td>
									</tr>
									<tr>
										<td>Fecha de Nacimiento: </td>
										<td>Dec, 15 1993</td>
									</tr>
									<tr>
										<td>Residencia: </td>
										<td>Ambato</td>
									</tr>
								</tbody>
							</Table>
						</div>
					</div>
				</TabPanel>
				<TabPanel>
					{/* <div className="tab-pane fade"> */}					
					<div className="account-setting deactivate-account">
						<h5 className="f-w-600 f-16">Mostrar estado</h5>
						<Row>
							<Col>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani"
										type="radio"
										name="rdo-ani"
										defaultChecked
									/>
									Siempre
								</Label>
								<Label className="d-block form-label">
									<Input
										className="radio_animated"
										id="edo-ani1"
										type="radio"
										name="rdo-ani"
									/>
									Solo en linea
								</Label>
								<Label className="d-block mb-0">
									<Input
										className="radio_animated"
										id="edo-ani2"
										type="radio"
										name="rdo-ani"
										defaultChecked
									/>
									Nunca
								</Label>
							</Col>
						</Row>						
					</div>
					<div className="account-setting deactivate-account">						
						<Button type="button" color="primary" onClick={routeChange}>
							Editar Perfil
						</Button>
					</div>
					{/* </div> */}
				</TabPanel>
			</Tabs>
		</div>
	);
};

export default TabsetProfile;
