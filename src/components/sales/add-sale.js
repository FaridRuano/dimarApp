import React, { Fragment } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import MyDropzone from "../common/dropzone";

const Add_transaction = () => {
	return (
		<Fragment>
			<Breadcrumb title="Nueva Venta"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Detalle de la venta</h5>
							</CardHeader>
							<CardBody>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Cod. Cliente
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												id="validationCustom0"
												type="text"
												required=""
											/>
										</div>
									</div>
                  					<div className="form-group row needs-validation">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Metodo de Pago
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
											<span>*</span> Descripcion
										</Label>
										<div className="col-md-8">
											<textarea
												className="form-control"
												id="validationCustom0"
												type="file"
												required=""
											/>
										</div>
									</div>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Total
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												id="validationCustom0"
												type="text"
												required=""
											/>
										</div>
									</div>
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
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Add_transaction;
