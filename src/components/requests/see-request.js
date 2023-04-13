import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row, Media, Button, Label, FormGroup } from "reactstrap";

const Seerequest = () => {
    function reqStatus(status){
		let st = status
		let res = ''
		switch (st) {
			case 'Ingresado':
				res = "bg-joined b-r-8";
				break;
			case 'Verificado':
				res = "bg-confirmed b-r-8";
				break;
			case 'Autorizado':
				res = "bg-send b-r-8";
				break;
			case 'Procesando':
				res = "bg-processing b-r-8";
				break;			
			case 'Facturando':
				res = "bg-billing b-r-8";
				break;
			case 'Despachado':
				res = "bg-sending b-r-8";
				break;
			case 'Enviado':
				res = "bg-delivered b-r-8";
				break;
			case 'Entregado':
				res = "bg-delivered b-r-8";
				break;
		}
		return res;
	}

  return (
    <Fragment>
			<Breadcrumb title="Pedido"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
                                <Row>
                                    <Col>
        								<h5>Pedido:</h5> #N34509
                                    </Col>
                                    <Col>
        								<h5>Vendedor:</h5> Usuario
                                    </Col>
                                </Row>
							</CardHeader>
							<CardBody>
								<Col>
                                    <div className=" order-graph sales-carousel">                                        
                                        <CardBody>
                                            <Media body>
                                                <Row>
                                                    <Col>
                                                        <span>Cliente:</span>
                                                        <h2 className="mb-0">Farid Ruano</h2>
                                                        <h6 className="f-w-600 f-8">											
                                                            <span>
                                                                <i className="fa fa-clock-o"></i>
                                                            </span>
                                                            Martes 12, 2023
                                                        </h6>
                                                    </Col>
                                                    <Col>
                                                        <span>Entregar en:</span>
                                                        <h2 className="mb-0">Manta</h2>                                                        
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span>
                                                            <p className="f-w-600 f-16">
                                                                Producto
                                                            </p>
                                                        </span>											
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            <p className="f-w-600 f-16">
                                                                Cantidad
                                                            </p>
                                                        </span>
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            <p className="f-w-600 f-16">
                                                                Precio
                                                            </p>
                                                        </span>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col>
                                                        <p>Lona Ferrara</p>
                                                    </Col>
                                                    <Col>
                                                        <p>3 metros</p>
                                                    </Col>
                                                    <Col>
                                                        <p>$35.5</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>Lona Blanca</p>
                                                    </Col>
                                                    <Col>
                                                        <p>5 metros</p>
                                                    </Col>
                                                    <Col>
                                                        <p>$35.5</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>Lona Azul</p>
                                                    </Col>
                                                    <Col>
                                                        <p>5 metros</p>
                                                    </Col>
                                                    <Col>
                                                        <p>$35.5</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <p>Lona Negro</p>
                                                    </Col>
                                                    <Col>
                                                        <p>8 metros</p>
                                                    </Col>
                                                    <Col>
                                                        <p>$35.5</p>
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                        <span>
                                                            <p className="f-w-600 f-16">
                                                                IVA
                                                            </p>
                                                        </span>	
                                                    </Col>
                                                    <Col>
                                                        <hr/>
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            <h6 className="f-w-600 f-16">
                                                                $ 5.00
                                                            </h6>
                                                        </span>	
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                        <span>
                                                            <p className="f-w-600 f-16">
                                                            Envio
                                                            </p>
                                                        </span>	
                                                    </Col>
                                                    <Col>
                                                        <hr/>
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            <h6 className="f-w-600 f-16">
                                                                $ 5.80
                                                            </h6>
                                                        </span>	
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                        <span>
                                                            <h4 className="f-w-600 f-16">
                                                                Total
                                                            </h4>
                                                        </span>	
                                                    </Col>
                                                    <Col>
                                                        <hr/>
                                                    </Col>
                                                    <Col>
                                                        <span>
                                                            <h6 className="f-w-600 f-16">
                                                                $ 155.00
                                                            </h6>
                                                        </span>	
                                                    </Col>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                <Card className=" o-hidden widget-cards">
                                                    <CardHeader className={reqStatus("Ingresado")}>																								
                                                        <Media body>
                                                            <Row xl="3">
                                                                <Col>
                                                                    <h4>Estado:</h4>
                                                                </Col>                                                                
                                                                <Col>
                                                                    <span className="m-0"><h3 className="text-white">Ingresado</h3></span>										
                                                                </Col>
                                                                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                                    <Button color="dark">Verificar</Button>										
                                                                </Col>
                                                            </Row>
                                                        </Media>														
                                                    </CardHeader>
                                                </Card> 
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span><h4>Observaciones</h4></span>
                                                    </Col>                                                    
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <div className="col-2">
                                                        <span><h5>Farid Ruano: </h5></span>
                                                    </div>
                                                    <div className="col-2">
                                                        <span>Observacion 1</span>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className="col-2">
                                                        <span><h5>Farid Ruano: </h5></span>
                                                    </div>
                                                    <div className="col-2">
                                                        <span>Observacion 2</span>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <div className="col-2">
                                                        <span><h5>Farid Ruano: </h5></span>
                                                    </div>
                                                    <div className="col-2">
                                                        <span>Observacion 3</span>
                                                    </div>
                                                </Row>
                                                <hr/>
                                                <Row>
                                                    <div className="digital-add needs-validation">
                                                        <FormGroup>                                                            
                                                            <textarea rows="4" cols="12"></textarea>
                                                        </FormGroup>
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                        <Button color="primary">Agregar Observacion</Button>	
                                                    </Col>
                                                </Row>
                                            </Media>
                                        </CardBody>
                                    </div>
                                </Col>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
  )
}

export default Seerequest