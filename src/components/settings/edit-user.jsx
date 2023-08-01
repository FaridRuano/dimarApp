import React, { Fragment, useState } from "react";
import { Card, CardBody,  Col, Container, Row, Form, FormGroup, Input, Label, Button } from "reactstrap";
import {  useNavigate, Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { NumericFormat } from "react-number-format";

const Edit_user = () => {
	


	const [birth, setBirth] = useState('')
	const [phone, setPhone] = useState('')
	const [gen, setGen] = useState('')
	const [dir, setDir] = useState('')



	const onChangeDate = (value) =>{		
		setBirth(value)
	}

	return (
		<Fragment>
			<Breadcrumb title="Editar Perfil"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>
								<Form className="needs-validation user-add">
									<h4>Detalles de Usuario</h4>																				
									<FormGroup className="row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Telefono
										</Label>
										<div className="col-xl-8 col-md-7">
											<NumericFormat  
												className="form-control"
												customInput={Input}
												maxLength={10}												
												allowNegative={false}
												decimalScale={0}
												allowLeadingZeros
												onChange={(e)=>{
													setPhone(e.target.value)
												}}
												value={phone || ''}
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
												type="text"
												maxLength={250}
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
														type="radio"
														name="rdo-ani4"
														defaultChecked
													/>
													Masculino
												</Label>
												<Label className="d-block">
													<Input
														className="radio_animated"
														type="radio"
														name="rdo-ani4"
													/>
													Femenino  
												</Label>
												<Label className="d-block">
													<Input
														className="radio_animated"
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
												format="YYYY-MM-DD"																								
												openTo="day"
												minDate={dayjs('1960-01-01')}
												views={['year','month', 'day']}
												value={birth}
												onChange={(newValue) => {
												  onChangeDate(newValue)
												}}
											/>
										</LocalizationProvider>
										</div>
									</div>	
									<FormGroup>
									<Button type="button" color="primary">
										Guardar
									</Button>
									<Link to='/settings/profile'>
										<Button type="button" color="light">
											Descartar
										</Button>
									</Link>
								</FormGroup>											
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Edit_user;
