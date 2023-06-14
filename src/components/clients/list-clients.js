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
import {  useNavigate } from "react-router-dom";
import axios from 'axios'



const Clients = () => {
		
	const baseUrl = "http://localhost:8080/modelsDimar/models/di_clients/clients.php";
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
					}}>
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
							onClick={() => routeChange("edit")}
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
					
			),
			width: '120px',
			center: true,

		},	
		{
			name: 'Cédula',
			selector: row => row.ced,
			center: true,
			width: '150px'		

		},
		{
			name: 'Nombre',
			selector: row => row.name,
			center: true,
			width: '150px'		

		},
		{
			name: 'Email',
			selector: row => row.email,
			wrap: true,
			center: true,
			width: '220px',

		},
		{
			name: 'Telefono',
			selector: row => row.phone,
			center: true,
			width: '120px',
		},
		{
			name: 'Dirección',
			selector: row => row.direc,
			wrap: true,
			center: true,
			width: '220px',
		},
		{
			name: 'Código',
			selector: row => row.cod,
			center: true,
			width: '100px',
		},
		{
			name: <span><i className="fa fa-user"/>Vendedor</span>,
			selector: row => row.saler,
			center: true,
			width: '150px',
		},

	]

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
