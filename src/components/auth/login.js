import React, { Fragment } from "react";
import LoginTabset from "./loginTabset";
import { ArrowLeft } from "react-feather";
import Slider from "react-slick";
import dimar from "../../assets/images/dashboard/dimarv2.png";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const Login = () => {
	var settings = {
		dots: true,
		infinite: true,
		speed: 500,
		arrows: false,
	};
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
									<Slider className="single-item" {...settings}>
										<div>
											<div>
												<h3>Bienvenido a Dimar App</h3>
												<p>
													Uso exclusivo de miembros de la empresa con el 
													cargo requerido.
											
												</p>
											</div>
										</div>										
									</Slider>
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
						<a
							/* to Tienda dimar  */
							href="#"
							target="_blank"
							rel="noreferrer"
							className="btn btn-primary back-btn"
						>
							<ArrowLeft />
							back
						</a>
					</Container>
				</div>
			</div>
		</Fragment>
	);
};

export default Login;
