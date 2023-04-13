import React, { Fragment } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

const TabsetEditUser = () => {
	return (
		<Fragment>
			<Tabs>
				<TabList className="nav nav-tabs tab-coupon">
					<Tab className="nav-link">Informacion</Tab>
					<Tab className="nav-link">Contraseña</Tab>
				</TabList>
				<TabPanel>
					<Form className="needs-validation user-add" noValidate="">
						<h4>Detalles de Usuario</h4>											
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Email
							</Label>
							<div className="col-xl-8 col-md-7">
								<Input
									className="form-control"
									id="validationCustom3"
									type="text"
									required=""
								/>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Telefono
							</Label>
							<div className="col-xl-8 col-md-7">
								<Input
									className="form-control"
									id="validationCustom3"
									type="text"
									required=""
								/>
							</div>
						</FormGroup>	
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Direccion
							</Label>
							<div className="col-xl-8 col-md-7">
								<Input
									className="form-control"
									id="validationCustom3"
									type="text"
									required=""
								/>
							</div>
						</FormGroup>	
						<div className="form-group row needs-validation">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Genero
							</Label>
							<div className="col-xl-8 col-md-7 px-1">
								<FormGroup className="m-checkbox-inline mb-2 custom-radio-ml d-flex radio-animated">
									<Label className="d-block">
										<Input
											className="radio_animated"
											id="edo-ani9"
											type="radio"
											name="rdo-ani4"
											defaultChecked
										/>
										Masculino
									</Label>
									<Label className="d-block">
										<Input
											className="radio_animated"
											id="edo-ani10"
											type="radio"
											name="rdo-ani4"
										/>
										Tarjeta   
									</Label>
									<Label className="d-block">
										<Input
											className="radio_animated"
											id="edo-ani10"
											type="radio"
											name="rdo-ani4"
										/>
										Otro
									</Label>
								</FormGroup>									
							</div>
						</div>	
						<div className="form-group row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Fecha de Nacimiento:
							</Label>
							<div className="col-md-8">
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DesktopDatePicker
									inputFormat="YYYY-MM-DD"																								
									openTo="day"
									views={['month', 'day']}
									minDate={dayjs('2023-01-01')}																	
									renderInput={(params) => <TextField {...params} />}
								/>
							</LocalizationProvider>
							</div>
						</div>												
					</Form>
				</TabPanel>		
				<TabPanel>
					<Form className="needs-validation user-add" noValidate="">
						<h4>Cambiar Contraseña</h4>											
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Nueva Contraseña
							</Label>
							<div className="col-xl-8 col-md-7">
								<Input
									className="form-control"
									id="validationCustom3"
									type="password"
									required=""
								/>
							</div>
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Confirmar Contraseña
							</Label>
							<div className="col-xl-8 col-md-7">
								<Input
									className="form-control"
									id="validationCustom3"
									type="password"
									required=""
								/>
							</div>
						</FormGroup>																								
					</Form>
				</TabPanel>			
			</Tabs>
			<div className="pull-right">
				<Button type="button" color="primary">
					Guardar
				</Button>
			</div>
		</Fragment>
	);
};

export default TabsetEditUser;
