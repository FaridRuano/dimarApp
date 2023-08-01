import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import dimar from "../../assets/images/dashboard/dimarv2.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {

	return (
		<Fragment>
			<div className="page-wrapper">
				<div className="authentication-box">
					<Container>
						<Row>
							<Col className="col-md-5 p-0 card-left">
								<Card className="bg-primary">
									<div className="svg-icon">
										<img alt="" src={dimar} className="Img-fluid" />
									</div>
									<div className="single-item">
										<div>
											<div>
												<h3>Bienvenido a</h3>
												<h3>Dimar App</h3>
												<p>
													Uso exclusivo de miembros de la empresa con el 
													cargo requerido.											
												</p>
											</div>
										</div>										
									</div>
								</Card>
							</Col>
							<Col className="col-md-7 p-0 card-right">
								<Card className="tab2-card">
									<CardBody>
										<LoginTabset />
									</CardBody>
								</Card>
							</Col>
						</Row>						
					</Container>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
