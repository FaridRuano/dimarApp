import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import MyDropzone from "../common/dropzone";
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";

const Add_product = () => {
	/* Dynamic Add */
	const [val, setVal] = useState([])

	const handleAdd=()=>{
		const abc=[...val,[]]
		setVal(abc)
	}

	const handleChange=(onChangeValue,i)=>{
		const inputdata=[...val]
		inputdata[i]=onChangeValue.target.value;
		setVal(inputdata)
	}

	const handleDelete=(i)=>{
		const deletVal=[...val]
		deletVal.splice(i,1)
		setVal(deletVal)  
	}
	console.log(val,"data-")
	/* End Add */

	return (
		<Fragment>
			<Breadcrumb title="Crear Producto"/>
			<Container fluid={true}>
				<Row className="product-adding">
						<Card>							
							<CardBody>
								<div className="digital-add needs-validation">
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Categoria
										</Label>
										<select className="form-select" required="">
											<option value="">--Seleccionar--</option>
											<option value="1">Forros</option>
											<option value="2">Limpiadores</option>
											<option value="3">Materiales</option>
											<option value="4">Sinteticos</option>
										</select>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label pt-0">
											<span>*</span> Nombre
										</Label>
										<Input
											className="form-control"
											id="validationCustom01"
											type="text"
											required=""
										/>
									</FormGroup>		
									<FormGroup>		
									<Label className="col-form-label">
												<span>*</span> Precios
									</Label>
									
									<Row>
										<Col>
											<FormGroup>											
											<Input
											className="form-control"
												id="validationCustom02"
												type="text"
												required=""
												placeholder="Contado"
											/>
											</FormGroup>
										</Col>
										<Col>
											<FormGroup>											
											<Input
												className="form-control"
												id="validationCustom02"
												type="text"
												required=""
												placeholder="Credito"
											/>
											</FormGroup>
										</Col>
										<Col>
											<FormGroup>											
											<Input
												className="form-control"
												id="validationCustom02"
												type="text"
												required=""
												placeholder="Distribuidor"
											/>
											</FormGroup>
										</Col>
									</Row>	
									</FormGroup>	
									
									<FormGroup>
										<Label className="col-6">
												<span>*</span> Colores
										</Label>
										<Button style={{padding: "1px"}} className="col-2 pull-right" onClick={()=>handleAdd()}>Agregar</Button>
									</FormGroup>
									<FormGroup>
										{val.map((data,i)=>{
											return(
											<FormGroup>
												<div style={{ position: "relative" }}>
														<Input 
															style={{ paddingRight: "40px"}}
															value={data} 
															onChange={e=>handleChange(e,i)} 
															className="form-control"
															id="validationCustom02"
															type="text"
															/>
														<button 
															style={{ color:"black", border: "none", backgroundColor: "#e7e7e7",position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
															color="warning"
															onClick={()=>handleDelete(i)}
															>
																<i className="fa fa-close"></i>
														</button>
												</div>												
											</FormGroup>
											)
										})}										
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Descripcion
										</Label>
										<textarea rows="4" cols="12"></textarea>
									</FormGroup>									
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Unidad
										</Label>
										<select className="form-select" required="">
											<option value="">--Seleccionar--</option>
											<option value="1">Metros</option>
											<option value="2">Litros</option>
											<option value="3">Unidades</option>											
										</select>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Distribuidor
										</Label>
										<select className="form-select" required="">
											<option value="">--Seleccionar--</option>
											<option value="1">China</option>
											<option value="2">Colombia</option>
											<option value="3">Nacional</option>											
										</select>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label pt-0"><span>*</span> Imagenes</Label>
										<MyDropzone />
									</FormGroup>
									<FormGroup className="mb-0">
										<div className="product-buttons text-left">
											<Button type="button" color="primary">
												Guadar
											</Button>
											<Button type="button" color="light">
												Descartar
											</Button>
										</div>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Add_product;
