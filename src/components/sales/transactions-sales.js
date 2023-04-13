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


const Transactions_sales = () => {
		
	const history = useNavigate();	


	const handleDelete = () => {
		if (window.confirm("Are you sure you wish to delete this item?")) {
			
		}
		toast.success("Successfully Deleted !");
	};

	const col=[
		{
			name: 'Imagen',
			selector: row => row.image,
		},
		{
			name: 'No. Venta',
			selector: row => row.no,
		},
		{
			name: 'No. Comprobante',
			selector: row => row.nocom,
			wrap:true
		},
		{
			name: 'Fecha',
			selector: row => row.fec,
			wrap:true
		},
		{
			name: 'Cliente',
			selector: row => row.name,
			wrap:true
		},
		{
			name: 'Usuario',
			selector: row => row.user,
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
	
			'image': <img alt="" src={pro16} style={{ width: 50, height: 50 }} />,
			'name': "Farid Ruano",
			'no' : "2346123",
			'nocom' : "1543260589",
			'user' : "Usuario",
			'fec' : "2023/03/15"
		},
	];

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/sales/add-transaction`);		
	};

	return (
		<Fragment>
			<Breadcrumb title="Transacciones" />
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
										Agregar Transaccion
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

export default Transactions_sales;
