import React, { Fragment, useState } from "react";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import TabsetPage from "./tabset-request";
import { useEffect } from "react";
import axios from "axios";
import ApiUrls from "../../constants/api-urls";

const Create_request = () => {
	const [reno, setReNo] = useState('0')

	const getReNo = async() =>{
		await axios.get(ApiUrls.requUrl+"?METHOD=NORE").then(response=>{
			if(response.data.re_no){
				setReNo(response.data.re_no)
			}else{
				setReNo('1')
			}
		})
	}

	const FormatedReno = () => {
		const desiredLength = 5;
		const paddedString = String(reno).padStart(desiredLength, '0');
		
		return (
			<span>{paddedString}</span>
		)
	}

	useEffect(()=>{
		getReNo()
	},[])

	return (
		<Fragment>
			<Breadcrumb title="Crear Pedido"/>
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>Pedido No. {
							reno === null ? (
								'Cargando...'
							):(								
								<FormatedReno/>
							)
						}</h5>
						
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
