import React, { Fragment } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import MyDropzone from "../common/dropzone";

const Add_category = () => {
	return (
		<Fragment>
			<Breadcrumb title="Crear Categoria"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Categoria Nueva</h5>
							</CardHeader>
							<CardBody>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Nombre
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
                  					<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Descripcion
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
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Imagen
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												id="validationCustom0"
												type="file"
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

export default Add_category;
