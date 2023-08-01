import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
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
import axios from 'axios'

const Category = () => {
		
	const baseUrl = "http://localhost/modelsDimar/models/di_products/categories.php";
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
				<div style={{textAlign:'center',cursor:'pointer'}}>
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
			width: '50px',
			center: true,
		},
		{
			name: 'ID',
			selector: row => row.id,
			center: true,
			width: '70px',
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			width: '200px',
		},
		{
			name: 'Descripcion',
			selector: row => row.descr,
			wrap:true,
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

	const routeChange = () =>{
		history(`${process.env.PUBLIC_URL}/products/add-category`);		
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
			<Breadcrumb title="Categorias" />
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
										color="primary"
										onClick={routeChange}
									>
										Agregar Categoria
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
										customStyles={customStyles}
										noDataComponent="No hay datos para mostrar" 
									/>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default Category;
