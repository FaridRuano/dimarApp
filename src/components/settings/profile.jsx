import React, { Fragment } from "react";

import TabsetProfile from "./tabset-profile";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row } from "reactstrap";


const Profile = () => {
	return (
		<Fragment>
			<Breadcrumb title="Perfil"/>
			<Container fluid={true}>
				<Row>
					<Card className="profile-card">
						<CardBody>
							<TabsetProfile />
						</CardBody>
					</Card>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Profile;
