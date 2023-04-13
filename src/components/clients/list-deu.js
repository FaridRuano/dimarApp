import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import {  useNavigate } from "react-router-dom";


const Clients = () => {
		
	const history = useNavigate();	

	const colDeu=[		
		{
			name: 'Codigo',
			selector: row => row.cod,
		},
		{
			name: 'Cliente',
			selector: row => row.name,
		},
		{
			name: 'Fec. Inicio',
			selector: row => row.start,
		},
		{
			name: 'Fec. Entrega',
			selector: row => row.deliver,
			wrap: true
		},
		{
			name: 'Fec. Max',
			selector: row => row.end,
		},
		{
			name: 'Estado',
			selector: row => row.status,
			cell: (row) => (
				<div className={deuStatus(row.status)}>
					<p style={{color: 'white', fontWeight: 'bold', textAlign: 'Center'}}>
						{deuStatusText(row.status)}
					</p>				
				</div>)
		},
		{
			name: 'Pagado',
			selector: row => row.deuPay,
			cell: (row) => (
				<div style={{ textAlign: 'Center'}}>
					<i className="fa fa-dollar"/>{row.deuPay}
				</div>				
			)
		},
		{
			name: 'Deuda Total',
			selector: row => row.deuTotal,
			cell: (row) => (
					<div style={{ textAlign: 'Center'}}>
						<i className="fa fa-dollar"/>{row.deuTotal}
					</div>				
				)
		},
		{
			name: 'Fec. Pago',
			selector: row => row.lastPay,
		},		
	]

	function deuStatus(status){
		let st = status
		let res = ''
		switch (st) {
			case 'N':
				res = "bg-warning b-r-8";
				break;
			case 'P':
				res = "bg-secondary b-r-8";
				break;
			case 'F':
				res = "bg-primary b-r-8";
				break;
		}
		return res;
	}
	function deuStatusText(status){
		let st = status
		let res = ''
		switch (st) {
			case 'N':
				res = "No Pagado";
				break;
			case 'P':
				res = "Parcialmente";
				break;
			case 'F':
				res = "Finalizada";
				break;
		}
		return res;
	}

	const dataDeu = [
		{	
			'cod' : "180546",
			'name': "Farid Ruano",
			'start': "2023-02-01",
			'deliver': "2023-02-15",
			'end': "2023-02-25",
			'status' : "N",
			'deuPay' : "5000",
			'deuTotal' : "15000",
			'lastPay': "2023-02-15",

			
		},
	];

	const colAbo=[		
		{
			name: 'Codigo',
			selector: row => row.cod,
		},
		{
			name: 'Cliente',
			selector: row => row.name,
		},
		{
			name: 'Fecha',
			selector: row => row.fec,
		},		
		{
			name: 'Metodo',
			selector: row => row.method,			
		},
		{
			name: 'Cantidad',
			selector: row => row.cant,
			cell: (row) => (
					<div style={{ textAlign: 'Center'}}>
						<i className="fa fa-dollar"/>{row.cant}
					</div>				
				)
		},		
	]

	const dataAbo = [
		{	
			'cod' : "180546",
			'name': "Farid Ruano",
			'method': "Efectivo",
			'fec': "2023-02-25",
			'cant': "5000",

			
		},
	];
	function routeChange(page) {
		if(page==="abono"){
			history(`${process.env.PUBLIC_URL}/clients/create-pay`);
		}		
	};

	return (
		<Fragment>
			<Breadcrumb title="Deudas Internas" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>	
							<CardHeader>
								<h3>Lista de Deudas</h3>														
							</CardHeader>						
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
								<div style={{height: '50px'}}/>						
								<div id="basicScenario" className="product-physical">
									<DataTable
										columns={colDeu}
										data={dataDeu}
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
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>	
							<CardHeader>
								<h3>Lista de Abonos</h3>														
							</CardHeader>						
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
										onClick={() => routeChange("abono")}
									>
										Agregar Abono
									</Button>									
								</div>
								<div id="basicScenario" className="product-physical">
									<DataTable
										columns={colAbo}
										data={dataAbo}
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

export default Clients;
