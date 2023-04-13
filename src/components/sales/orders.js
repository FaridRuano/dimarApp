import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import pro16 from "../../assets/images/dashboard/product/1.jpg";
import { ToastContainer, toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Row,
} from "reactstrap";
import {  useNavigate } from "react-router-dom";


const Sales = () => {
		
	const history = useNavigate();	


	const handleDelete = () => {
		if (window.confirm("Are you sure you wish to delete this item?")) {
			
		}
		toast.success("Successfully Deleted !");
	};

	const col=[
		{
			name: 'No. Venta',
			selector: row => row.no,
		},
		{
			name: 'Cliente',
			selector: row => row.name,
		},
		{
			name: 'Metodo de Pago',
			selector: row => row.method,
		},
		{
			name: 'Fecha',
			selector: row => row.fec,
		},
		{
			name: 'Total',
			selector: row => row.total,
		},
		{
			name: 'Descripcion',
			selector: row => row.description,
			wrap:true
		},
		{
			name: "Opciones",		
			cell: (row) => (
				<div style={{textAlign:'center'}}>
					<span onClick={() => handleDelete()}>
						<i
							className="fa fa-trash"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "#e4566e",
							}}
						></i>
					</span>

					<span>
						<i
							onClick={routeChange}
							className="fa fa-pencil"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "rgb(40, 167, 69)",
							}}
						></i>						
					</span>
				</div>				
					
			)
		},	
	]

	const data = [
		{	
	
			'no': '345062',
			'name': "Farid Ruano",
			'method' : 'Efectivo',
			'fec' : '2023/03/21',
			'total' : '$15.00',
			'description': "12 unidades de ferramato",		
		},
	];

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/sales/add-sale`);		
	};

	return (
		<Fragment>
			<Breadcrumb title="Ventas" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>
								<div className="col-6 pull-left">									
									<Input
										className="form-control"
										id=""
										type="text"
										required=""
										placeholder="Buscar"
									/>								
								</div>
								<div className="btn-popup pull-right">
									<Button
										type="button"
										color="primary"
										onClick={routeChange}
									>
										Nueva Venta
									</Button>									
								</div>
								<div className="clearfix"></div>
								<div id="basicScenario" className="product-physical">
									<DataTable
										columns={col}
										data={data}
										multiSelectOption={false}
										pageSize={10}
										pagination={true}
										class="-striped -highlight"
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer />
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default Sales;
