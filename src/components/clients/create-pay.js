import React, { Fragment,useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, Input, Label, Row} from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import {  useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import dayjs from "dayjs";

const Create_active = () => {
      
	const history = useNavigate();
    const [value, setValue] = useState([dayjs()]);
            
	
    function onChangeDate(value){
		setValue(value);
	}
    

	return (
		<Fragment>			
			<Breadcrumb title="Actualizar Plan"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Cliente</h5>
							</CardHeader>
							<CardBody>
								<Form className="needs-validation">
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> ID: 
										</Label>
										<div className="col-md-4">
											<Input
												className="form-control"
												name='id'
												/>												
										</div>																			
									</div>																				
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Fecha de Inicio:
										</Label>
										<div className="col-md-4">
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DesktopDatePicker
												format="YYYY-MM-DD"																								
												openTo="day"
												views={['month', 'day']}
												minDate={dayjs('2023-01-01')}												
												renderInput={(params) => <TextField {...params} />}

											/>
    									</LocalizationProvider>
										</div>
									</div>
                                    <div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Cantidad: 
										</Label>
										<div className="col-md-4">
											<Input
												className="form-control"
												name='id'
												/>												
										</div>																			
									</div>
                                    <div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Forma de Pago: 
										</Label>
										<div className="col-md-4">
                                            <select className="form-select" required="">
                                                <option value="">--Seleccionar--</option>
                                                <option value="1">Efectivo</option>
                                                <option value="2">Cheque</option>
                                                <option value="3">Tarjeta</option>
                                            </select>											
										</div>																			
									</div>
                                    <div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Observaciones: 
										</Label>
										<div className="col-md-6">
                                            <textarea
												className="form-control"
												name='id'
												/>											
										</div>																			
									</div>
									<Button type="button" color="primary">
										Guardar
									</Button>	
									<ToastContainer theme="colored"/>								
								</Form>

							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Create_active;
