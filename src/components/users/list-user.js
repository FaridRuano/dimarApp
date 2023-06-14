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
			name: "",		
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
			),
			center: true,
			width: '50px',
		},
		{
			name: 'Cedula',
			selector: row => row.ced,
			width: '140px',
			center: true
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			width: '170px',
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
			name: <i className="fa fa-cube"/>,
			selector: row => row.suc,
			width: '70px',
			center: true,
		},
		{
			name: <i className="fa fa-tasks"/>,
			selector: row => row.perm,
			center: true,
			width: '70px',
		},	
		{
			name: <i className="fa fa-venus-mars"/>,
			selector: row => row.gender,
			cell: (row) => (
				<Fragment>
					{row.gender===null ? <span>S/I</span> : <span>{row.gender}</span>}				
				</Fragment>
			),
			center: true,
			width: '70px',

		},	
		{
			name: 'Telefono',
			selector: row => row.phone,
			cell: (row) => (
				<Fragment>
					{row.phone===null ? <span>Sin info</span> : <span>{row.phone}</span>}				
				</Fragment>
			),
			width: '130px',

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
	]

	const customStyles = {
		rows: {
			style: {
				minHeight: '52px',
			},
		},
		headCells: {
			style: {
				padding: '10px',
				fontSize: '0.9rem',
				fontWeight: 'bold',
				background: 'rgba(236, 240, 241 ,0.4)', 
			},
		},
		cells: {
			style: {
				padding: '15px',	
			},
		},
	}

	const ExpandedComponent = ({ data }) => (
		<div style={{margin: '10px', marginLeft:'50px',padding: '1opx', display: 'flex', flexDirection:'row',gap:'5rem'}}>
			<span>
				<h2 style={{fontSize: '12px'}}>Email:</h2>
				<p>{JSON.stringify(data.email, null, 2)}</p>
			</span>			
			<span>
				<h2 style={{fontSize: '12px'}}>Direccion:</h2>
				{data.dir? <p>{JSON.stringify(data.dir, null, 2)}</p>:<p>Sin Info.</p>}
				
			</span>			
		</div>		
	)

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
								<div>
									<DataTable
										columns={col}
										data={filtered}
										multiSelectOption={false}
										pageSize={10}
										pagination={true}
										noDataComponent="No hay datos para mostrar" 
										expandableRows
										expandableRowsComponent={ExpandedComponent}
										customStyles={customStyles}
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
