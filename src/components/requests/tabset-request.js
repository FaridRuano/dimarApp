import React, { Fragment, useState } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, Input, Label, FormGroup, Col, Row } from "reactstrap";

const TabsetPage = () => {
	const [inputFields, setInputFields] = useState([{ prod: '', quant: '' }]);

	const addInputFields = () => {
	  setInputFields([...inputFields, { prod: '', quant: '' }]);
	};
  
	const handleInputChange = (index, event) => {
	  const values = [...inputFields];
	  values[index][event.target.name] = event.target.value;
	  setInputFields(values);
	};
  
	const handleDeleteFields = (index) => {
	  const values = [...inputFields];
	  values.splice(index, 1);
	  setInputFields(values);
	};
	console.log(inputFields,"data-")
	return (
		<Fragment>
			<div>
				<Tabs>
					<TabList className="nav nav-tabs tab-coupon">
						<Tab className="nav-link">Informacion</Tab>
						<Tab className="nav-link">Detalle</Tab>
					</TabList>

					<TabPanel>
						<Form className="needs-validation">
							<h4>General</h4>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Cod. Cliente
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										className="form-control"
										id="validationCustom0"
										type="text"
									/>
								</div>
							</div>							
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4"><span>*</span> Forma de Pago</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
										<Label className="d-block">
											<Input
												className="radio_animated"
												id="edo-ani9"
												type="radio"
												name="rdo-ani4"
												defaultChecked
											/>
											Efectivo
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
											Credito Int.
										</Label>
									</FormGroup>									
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Ciudad
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										className="form-control"
										id="validationCustom0"
										type="text"
									/>
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Direccion
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										className="form-control"
										id="validationCustom0"
										type="text"
									/>
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4"><span>*</span> Tipo de Entrega</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
										<Label className="d-block">
											<Input
												className="radio_animated"
												id="edo-ani12"
												type="radio"
												name="rdo-ani5"
												defaultChecked
											/>
											Fisica
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												id="edo-ani11"
												type="radio"
												name="rdo-ani5"
											/>
											Servi Entrega
										</Label>										
									</FormGroup>									
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Asesor
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										className="form-control"
										id="validationCustom0"
										type="text"
										value="Usuario"
										readOnly
									/>
								</div>
							</div>			
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Descripcion
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<textarea
										className="form-control"
										id="validationCustom0"
										type="text"
									/>
								</div>
							</div>					
						</Form>
					</TabPanel>
					<TabPanel>
						<div className="needs-validation">
							<h4>Detalle del Pedido</h4>
							<FormGroup>
								<Label className="col-6">
										<span>*</span> Productos
								</Label>
								<Button style={{padding: "1px", whiteSpace: 'nowrap'}} className="col-2 pull-right" onClick={addInputFields}>Agregar</Button>
							</FormGroup>
							<FormGroup>
								{inputFields.map((inputField, index) => {
									return(
									<FormGroup key={index}>
										<Row>
											<Col>
												<Input 
												name="prod"
												style={{ paddingRight: "40px"}}
												value={inputField.prod} 
												onChange={(event) => handleInputChange(index, event)}
												className="form-control"
												type="text"
												placeholder="Producto"
												/>
											</Col>
											<Col>
												<Input 
												name="quant"
												style={{ paddingRight: "40px"}}
												value={inputField.quant} 
												onChange={(event) => handleInputChange(index, event)}
												className="form-control"
												type="text"
												placeholder="Cantidad"
												/>
											</Col>	
											<Col style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
												<div>
													<p>0.00$</p>
												</div>
												<div>
													<button 
														style={{ color:"black", border: "none", backgroundColor: "#e7e7e7"}}
														color="warning"
														onClick={() => handleDeleteFields(index)}
														>
														<i className="fa fa-close"></i>
													</button>
												</div>
												
											</Col>												
												
										</Row>												
									</FormGroup>
									)
									})}									
							</FormGroup>
							<hr/>
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h5>IVA</h5>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p>0.98$</p>
								</Col>
							</Row>
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h5>Envio</h5>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p>5.98$</p>
								</Col>
							</Row>
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h4>Total</h4>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p>15.98$</p>
								</Col>
							</Row>
						</div>
					</TabPanel>
				</Tabs>
				<div className="pull-right">
					<Button type="button" color="primary">
						Guardar
					</Button>
				</div>
			</div>
		</Fragment>
	);
};

export default TabsetPage;
