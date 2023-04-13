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
import axios from 'axios'
import {  useNavigate } from "react-router-dom";



const List_Users = () => {
	const baseUrl = "http://localhost:8080/modelsDimar/models/di_users/users.php";
	const history = useNavigate();
	const [search, setSearch] = useState("");
    const [data, setData] = useState([]);		 
	const [filtered, setFiltered] = useState([]);
	
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

	const col=[
		{
			name: "Eliminar",		
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
				</div>									
			)
		},
		{
			name: 'Cedula',
			selector: row => row.ced,
		},
		{
			name: 'Nombre',
			selector: row => row.name,
		},
		{
			name: 'Usuario',
			selector: row => row.usna,		
			cell: (row) => (
				<Fragment>
					{row.usna===null ? <span>Sin info</span> : <span>{row.usna}</span>}				
				</Fragment>
			)							
		},
		{
			name: 'Email',
			selector: row => row.email,
			wrap:true
		},
		{
			name: 'Sucursal',
			selector: row => row.suc,
		},
		{
			name: 'Cargo',
			selector: row => row.perm,
		},	
		{
			name: 'Telefono',
			selector: row => row.phone,
			cell: (row) => (
				<Fragment>
					{row.phone===null ? <span>Sin info</span> : <span>{row.phone}</span>}				
				</Fragment>
			)	
		},		
		{
			name: 'Fec. Nac.',
			selector: row => row.birth,
			cell: (row) => (
				<Fragment>
					{row.birth===null ? <span>Sin info</span> : <span>{row.birth}</span>}				
				</Fragment>
			)	
		},
		{
			name: 'Genero',
			selector: row => row.gender,
			cell: (row) => (
				<Fragment>
					{row.gender===null ? <span>Sin info</span> : <span>{row.gender}</span>}				
				</Fragment>
			),
			center: true
		},		
		{
			name: 'Direccion',
			selector: row => row.dir,
			cell: (row) => (
				<Fragment>
					{row.dir===null ? <span>Sin info</span> : <span>{row.dir}</span>}				
				</Fragment>
			),
			wrap:true
		},				
	]

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/users/create-user`);		
	};

	useEffect(()=>{
        requestGet();
    },[])	

	useEffect(()=>{
		const result = data.filter(name =>{
			return name.name.toLowerCase().match(search.toLowerCase());
		});

		setFiltered(result);
	},[search])

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
										onClick={routeChange}
									>
										<i className="fa fa-plus"/>
									</Button>																		
								</div>
								<div className="clearfix"></div>
								<div id="basicScenario" className="product-physical">
									<DataTable
										columns={col}
										data={filtered}
										multiSelectOption={false}
										pageSize={10}
										pagination={true}
										class="-striped -highlight"
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

export default List_Users;
