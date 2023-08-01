import React, { Fragment } from "react";

import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, Col, Container, Row, Input, FormGroup, CardHeader } from "reactstrap";


const Messages = () => {
  
	return (
		<Fragment>
			<Breadcrumb title="Chat de la Empresa"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>					
              <CardHeader>
                <h3>Edison Garzon</h3>
              </CardHeader>		
							<CardBody>
                <Card className=" o-hidden widget-cards">
                  <CardHeader style={{backgroundColor: '#35748d'}}>																								
                    <div style={{color: 'white'}}> Hola</div>
                  </CardHeader>
                  <CardHeader>																								
                    Como estas			
                  </CardHeader>
                  <CardHeader style={{backgroundColor: '#35748d'}}>																								
                    <div style={{color: 'white'}}> Bien y tu?</div>
                  </CardHeader>
                </Card> 
                <FormGroup>
                  <div style={{ position: "relative" }}>
                      <Input 
                        style={{ paddingRight: "40px"}}
                        className="form-control"
                        id="validationCustom02"
                        type="text"
                        placeholder="Mensaje"
                        />
                      <button 
                        style={{ color:"black", border: "none", backgroundColor: "#e7e7e7",position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
                        color="warning"
                        >
                          <i className="fa fa-paper-plane"></i>
                      </button>
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

export default Messages;
