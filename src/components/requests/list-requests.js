import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";

const Listrequests = () => {		

	const history = useNavigate();

	const col=[		
		{
			name:'',
			selector: row => row.id,
			cell: () => (
				<div style={{textAlign:'center'}}>
					<span onClick={() => routeChange("see")} style={{ cursor:'pointer'}}>
						<i
							className="fa fa-edit"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "rgb(30, 90, 180)",
							}}
						></i>					
					</span>									
				</div>									
			)
		},
		{
			name: 'No.',
			selector: row => row.no,
			wrap:true
		},
		{
			name: 'Cliente',
			selector: row => row.name,
			wrap:true
		},
		{
			name:'Estado',
			selector: row => row.status,
			cell: (row) => (
				<div style={{textAlign:'center'}} className={reqStatus(row.status)}>		
					{row.status}
				</div>									
			)
		},
		{
			name: 'Método',
			selector: row => row.method,			
		},		
		{
			name: 'Tipo de Envio',
			selector: row => row.deliver,
			wrap:true
		},					
		{
			name: 'Fecha de Ingreso',
			selector: row => row.fecIni,
			wrap:true
		},	
		{
			name: 'Fecha de Entrega',
			selector: row => row.fecIni,
			wrap:true
		},	
		{
			name: 'Iniciador',
			selector: row => row.host,
			wrap:true
		},	
	]

	function reqStatus(status){
		let st = status
		let res = ''
		switch (st) {
			case 'Ingresado':
				res = "bg-joined b-r-8";
				break;
			case 'Verificado':
				res = "bg-confirmed b-r-8";
				break;
			case 'Autorizado':
				res = "bg-send b-r-8";
				break;
			case 'Procesando':
				res = "bg-processing b-r-8";
				break;			
			case 'Facturando':
				res = "bg-billing b-r-8";
				break;
			case 'Despachado':
				res = "bg-sending b-r-8";
				break;
			case 'Enviado':
				res = "bg-delivered b-r-8";
				break;
			case 'Entregado':
				res = "bg-delivered b-r-8";
				break;
		}
		return res;
	}

	const data = [
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Ingresado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Verificado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Autorizado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Procesando",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Facturando",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},		
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Despachado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Enviado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},		
		{			
			'no' : "N34550",
			'name': "Farid Ruano",		
			'status' : "Entregado",
			'method': "Efectivo",
			'fecIni': "2023-03-14",
			'deliver': "Servi Entrega",
			'host' : "Usuario"
		},	
	];

	function routeChange(view) {
		if(view==="see"){
			history(`${process.env.PUBLIC_URL}/requests/see-request`);
		}		

	};

	return (
		<Fragment>
			<Breadcrumb title="Lista de Pedidos" />
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

export default Listrequests;
