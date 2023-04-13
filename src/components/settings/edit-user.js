import React, { Fragment } from "react";
import { Card, CardBody,  Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetUser from "./tabset-edit-user";

const Edit_user = () => {
	return (
		<Fragment>
			<Breadcrumb title="Crear Usuario" parent="Users" />
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>
								<TabsetUser />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Edit_user;
