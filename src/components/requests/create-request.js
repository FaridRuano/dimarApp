import React, { Fragment } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetPage from "./tabset-request";

const Create_request = () => {
	return (
		<Fragment>
			<Breadcrumb title="Crear Pedido"/>
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>Informacion del pedido</h5>
					</CardHeader>
					<CardBody>
						<TabsetPage />
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Create_request;
