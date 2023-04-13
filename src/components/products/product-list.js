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

const Product_list = () => {		

	const history = useNavigate();

	const handleDelete = () => {
		if (window.confirm("Estas seguro que deseas eliminar?")) {
			
		}
		toast.success("Eliminado correctamente !");
	};

	const col=[		
		{
			name:'',
			selector: row => row.id,
			cell: () => (
				<div style={{textAlign:'center'}}>
					<span onClick={() => routeChange("view")} style={{ cursor:'pointer'}}>
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
			name: 'Categoria',
			selector: row => row.category,
			wrap:true
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			wrap:true
		},
		{
			name:'Disponibilidad',
			selector: row => row.disp,
			cell: (row) => (
				<div style={{textAlign:'center'}}>
					<span>
						<i
							className={row.disp===1?"fa fa-circle":"fa fa-circle-o"}
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
		{
			name: 'P. Contado',
			selector: row => row.cash,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.cash}
					</span>
				</div>
			)
		},
		{
			name: 'P. Credito',
			selector: row => row.credit,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.cash}
					</span>
				</div>
			)
		},
		{
			name: 'P. Distribuidor',
			selector: row => row.distrib,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.distrib}
					</span>
				</div>
			)
		},
		{
			name: 'Descripcion',
			selector: row => row.descrip,
			wrap:true
		},					
		{
			name: 'Unidad',
			selector: row => row.unidad,
			wrap:true
		},
		{
			name: "Opciones",		
			cell: (row) => (
				<div style={{textAlign:'center'}}>
					<span onClick={() => routeChange("edit")} style={{ cursor:'pointer'}}>
						<i
							className="fa fa-pencil"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "rgb(40, 167, 69)",
							}}
						></i>					
					</span>
					<span onClick={() => handleDelete()} style={{ cursor:'pointer'}}>
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
				</div>									
			)
		},
	]

	const data = [
		{			
			'id' : "1",
			'category' : "Textiles",
			'name': "Forros",
			'cash': "6.60",		
			'credit': "5.60",		
			'distrib': "5.20",	
			'descrip' : "Telado rojo con marfil",
			'unidad' : "Metros",
			'disp' : "1"
		},
		{			
			'id' : "2",
			'category' : "Pegante",
			'name': "Urano Spray",
			'cash': "20.60",		
			'credit': "15.60",		
			'distrib': "14.20",	
			'descrip' : "Urano pegante spray caneca",
			'unidad' : "Litros",
			'disp' : "0"
		},
	];

	function routeChange(view) {
		if(view==="add"){
			history(`${process.env.PUBLIC_URL}/products/add-product`);
		}
		if(view==="edit"){
			history(`${process.env.PUBLIC_URL}/products/add-product`);
		}
		if(view==="view"){
			history(`${process.env.PUBLIC_URL}/products/product-detail`);
		}

	};

	return (
		<Fragment>
			<Breadcrumb title="Lista de Productos" />
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
										data-toggle="modal"
										data-original-title="test"
										data-target="#exampleModal"
										onClick={() => routeChange("add")}
									>
										Agregar Producto
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

export default Product_list;
