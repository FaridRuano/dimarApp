import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import {
	Button,
	Card,
	CardBody,
	Col,
	Container,
	Input,
	Row,
} from "reactstrap";
import {  Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import ApiUrls from "../../constants/api-urls";


const Clients = () => {
		
	const baseUrl = ApiUrls.cliUrl;
	const history = useNavigate();
	const [search, setSearch] = useState("");
    const [data, setData] = useState([]);		 
	const [filtered, setFiltered] = useState([]);
		
	const col=[		
		{
			name: "Opciones",		
			cell: (row) => (
				<div style={{textAlign:'center'}}>
					<span onClick={(e) => {						
						if (window.confirm("Estas seguro que deseas eliminar?"))
						requestDelete(row.id);
					}}
						style={{cursor: 'pointer'}}
					>
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
					<Link to={`/clients/create-client/${row.id}`}>
						<span style={{cursor: 'pointer'}}>
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
					</Link>
					
				</div>				
					
			),
			center: true,

		},	
		{
			name: 'Cédula',
			selector: row => row.ced,

		},
		{
			name: 'Nombre',
			selector: row => row.name,

		},
		{
			name: 'Código',
			selector: row => row.cod,
			center: true,
		},
		{
			name: <span><i className="fa fa-user"/>Vendedor</span>,
			selector: row => row.saler,
			center: true,
		},

	]

	const expComp = ({ data }) => (
		<div style={{margin: '20px 0 10px 50px',padding: '1opx', display: 'flex', flexDirection : 'column', gap: '.5rem'}}>
			<Row>
				<Col>
					<h2 style={{fontSize: '12px'}}>Email:</h2>
				</Col>
				<Col>
					<span>{data.email}</span>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 style={{fontSize: '12px'}}>Telefono:</h2>
				</Col>
				<Col>
					<span>{data.phone}</span>
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 style={{fontSize: '12px'}}>Ciudad:</h2>
				</Col>
				<Col>
					<span>{data.city}</span>		
				</Col>
			</Row>
			<Row>
				<Col>
					<h2 style={{fontSize: '12px'}}>Dirección:</h2>
				</Col>
				<Col>
					<span>{data.direc}</span>		
				</Col>
			</Row>
		</div>		
	)

	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
			setFiltered(response.data);
        })
    }

	const requestDelete=async(id)=>{
        var f = new FormData();
        f.append("METHOD", "DELETE");
		f.append("id", id);
        await axios.post(baseUrl, f).then(response=>{
            setData(data.filter(row=>row.id!==id));
        }).catch(error=>{
          console.log(error);
        })
		toast.success("Eliminado Exitosamente!");
        requestGet();
    }

	function routeChange(page) {
		if(page==="add"){
			history(`${process.env.PUBLIC_URL}/clients/create-client`);
		}
		if(page==="edit"){
			history(`${process.env.PUBLIC_URL}/clients/create-client`);
		}
		if(page==="view"){
			history(`${process.env.PUBLIC_URL}/clients/list-deu`);
		}
	};

	useEffect(()=>{
        requestGet();
    },[])	

	useEffect(()=>{
		const result = data.filter(names =>{			
			return names.name.toLowerCase().match(search.toLowerCase());
		});

		setFiltered(result);
	},[search])

	return (
		<Fragment>
			<Breadcrumb title="Clientes" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>
								<div className="col-6 pull-left">									
									<Input
										type="text"
										placeholder="Ingresa un nombre"
										value={search}
										onChange={(e) => setSearch(e.target.value)}

									/>								
								</div>
								<div className="btn-popup pull-right">
									<Button
										type="button"
										color="secondary"
										onClick={() =>routeChange('add')}
									>
										<i className="fa fa-plus"/>
									</Button>																		
								</div>
								<div className="clearfix"></div>
								<div>
									<DataTable
										columns={col}
										data={filtered}
										pageSize={10}
										pagination={true}
										noDataComponent="No hay datos para mostrar" 
										expandableRows
										expandableRowsComponent={expComp}										
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
