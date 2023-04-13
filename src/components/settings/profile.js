import React, { Fragment } from "react";

import designer from "../../assets/images/dashboard/designer.jpg";
import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Media, Row, Button } from "reactstrap";


const Profile = () => {
	return (
		<Fragment>
			<Breadcrumb title="Perfil"/>
			<Container fluid={true}>
				<Row>
					<Col xl="4">
						<Card>
							<CardBody>
								<div className="profile-details text-center">
									<img
										src={designer}
										alt=""
										className="img-fluid img-90 rounded-circle blur-up lazyloaded"
									/>
									<h5 className="f-w-600 f-16 mb-0">Karol Garzon</h5>
									<span>karol@gmail.com</span>
									<div className="social">
										<div className="form-group btn-showcase">
											<Button color="btn social-btn btn-fb d-inline-block">
												{" "}
												<i className="fa fa-facebook"></i>
											</Button>
											<Button color="btn social-btn btn-twitter d-inline-block">
												<i className="fa fa-google"></i>
											</Button>
											<Button color="btn social-btn btn-google d-inline-block me-0">
												<i className="fa fa-twitter"></i>
											</Button>
										</div>
									</div>
								</div>
								<hr />
								<div className="project-status">
									<h5 className="f-w-600 f-16">Desempeño Mensual</h5>
									<Media>
										<Media body>
											<h6>
												Desarrollo <span className="pull-right">80%</span>
											</h6>
											<div className="progress sm-progress-bar">
												<div
													className="progress-bar bg-primary"
													role="progressbar"
													style={{ width: "80%" }}
													aria-valuenow="25"
													aria-valuemin="0"
													aria-valuemax="100"
												></div>
											</div>
										</Media>
									</Media>
									<Media>
										<Media body>
											<h6>
												Ventas <span className="pull-right">60%</span>
											</h6>
											<div className="progress sm-progress-bar">
												<div
													className="progress-bar bg-secondary"
													role="progressbar"
													style={{ width: "60%" }}
													aria-valuenow="25"
													aria-valuemin="0"
													aria-valuemax="100"
												></div>
											</div>
										</Media>
									</Media>
									<Media>
										<Media body>
											<h6>
												Trabajo <span className="pull-right">50%</span>
											</h6>
											<div className="progress sm-progress-bar">
												<div
													className="progress-bar bg-danger"
													role="progressbar"
													style={{ width: "50%" }}
													aria-valuenow="25"
													aria-valuemin="0"
													aria-valuemax="100"
												></div>
											</div>
										</Media>
									</Media>
								</div>
							</CardBody>
						</Card>
					</Col>
					<Col xl="8">
						<Card className="profile-card">
							<CardBody>
								<TabsetProfile />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Profile;
