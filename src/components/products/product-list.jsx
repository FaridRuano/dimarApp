import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import {  useNavigate, Link } from "react-router-dom";
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
import ApiUrls from "../../constants/api-urls";



const Product_list = () => {		

	const baseUrl = ApiUrls.prodUrl
	const history = useNavigate()
	const [search, setSearch] = useState("")
    const [data, setData] = useState([])
	const [filtered, setFiltered] = useState([])
	
	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data)
			setFiltered(response.data)
        })
    }

	const requestDelete=async(id)=>{
        var f = new FormData()
        f.append("METHOD", "DELETE")
		f.append("id", id)
        await axios.post(baseUrl, f).then(response=>{
            setData(data.filter(row=>row.id!==id))
        }).catch(error=>{
          console.log(error)
        })
		toast.success("Eliminado Exitosamente!")
        requestGet()
    }

	const col=[		
		{
			name:'Opciones',
			selector: row => row.id,
			cell: (row) => (
				<div style={{textAlign:'center',cursor:'pointer'}}>				
					<Link to={`/products/product-detail/${row.id}`}>
						<span onClick={() => routeChange("view")}>
							<i
								className="fa fa-dashcube"
								style={{
									width: 35,
									fontSize: 20,
									padding: 11,
									color: "rgb(30, 90, 180)",
								}}
							></i>					
						</span>		
					</Link>
					<Link to={`/products/add-product/${row.id}`}>
						<span>
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
			width: '150px',
		},
		{
			name: 'Categoria',
			selector: row => row.cate,
			wrap:false,
			width: '140px',
		},
		{
			name: 'Nombre',
			selector: row => row.name,
			wrap:true,
			width: '150px',
		},
		{
			name:<i className="fa fa-cubes"></i>,
			selector: row => row.dispo,
			cell: (row) => (
				<div style={{textAlign:'center'}}>
					<span>
						<i
							className={row.dispo?"fa fa-circle":"fa fa-circle-o"}
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "rgb(40, 167, 69)",
							}}
							
						/>
					</span>									
				</div>									
			),
			center: true,

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
			selector: row => row.card,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.card}
					</span>
				</div>
			)
		},
		{
			name: 'P. Distribuidor',
			selector: row => row.dist,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.dist}
					</span>
				</div>
			)
		},					
		{
			name: 'P. Plaza',
			selector: row => row.plaza,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.plaza}
					</span>
				</div>
			)
		},
		{
			name: 'P. Especial',
			selector: row => row.special,
			cell: (row) => (
				<div>
					<span>
						<i 
							className="fa fa-dollar"
							style={{
								fontSize: 15,
							}}
						/>
						{row.special}
					</span>
				</div>
			)
		},
		{
			name: 'Unidad',
			selector: row => row.unit,
			wrap:true
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
		<div style={{margin: '10px', marginLeft:'50px',padding: '1opx'}}><span><h2 style={{fontSize: '12px'}}>Descripcion:</h2><p>{JSON.stringify(data.descrip, null, 2)}</p></span></div>		
	)
	
	useEffect(()=>{
        requestGet();
    },[])	

	useEffect(()=>{
		const result = data.filter(name =>{
			return name.name.toLowerCase().match(search.toLowerCase());
		});

		setFiltered(result);
	},[search])

	function routeChange() {
		history(`${process.env.PUBLIC_URL}/products/add-product`);
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
										data-toggle="modal"
										data-original-title="test"
										data-target="#exampleModal"
										onClick={() => routeChange()}
									>
										Agregar Producto
									</Button>									
								</div>
								<div className="clearfix"></div>
								<div>
									<DataTable
										columns={col}
										data={filtered}
										pageSize={10}
										expandableRows
										pagination={true}
										expandableRowsComponent={ExpandedComponent}
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

export default Product_list;
