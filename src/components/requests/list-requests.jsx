import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import DataTable from "react-data-table-component";
import { Link } from 'react-router-dom';
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
} from "reactstrap";
import ApiUrls from "../../constants/api-urls";
import axios from "axios";
import { useEffect } from "react";
import { ExternalLink } from "react-feather";
import StatusSpan from "./components/status.span";

const Listrequests = () => {		

	const [reqData, setReqData] = useState([])
	const [cliData, setCliData] = useState([])
	const [statData, setStatData] = useState([])

	const reqDat = async()=>{
		await axios.get(ApiUrls.requUrl).then(response=>{
			setReqData(response.data)
		})
		await axios.get(ApiUrls.cliUrl).then(response=>{
			setCliData(response.data)
		})
		await axios.get(ApiUrls.requUrl+'?METHOD=DETST').then(response=>{			
			setStatData(response.data)
		})

	}

	function statRe (reid){
		const filteredData = statData.filter((item)=>item.reid === reid)
		return filteredData
	}

	//Datatable
	const col=[		
		{
			name: 'Opciones',
			cell: (row) => (
				<div style={{cursor: 'pointer'}}>
					<Link to={`/requests/see-request/${row.id}`}>
						<ExternalLink style={{color: '#3b3b3b'}}/>		
					</Link>
				</div>				
					
			),
			center: true,
		},			
		{
			name: 'No.',
			selector: row => row.id,
			cell: (row) => (
				<div>
					<span>{String(row.id).padStart(5, '0')}</span>
				</div>
			),
		},
		{
			name: 'Cedula',
			selector: row => row.cli,
			cell: (row) => (
				<div>
					<span>{row.cli}</span>
				</div>
			),
		},
		{
			name: 'Cliente',
			selector: row => row.cli,
			cell: (row) => (
				<div>
					<span>{getCliName(row.cli)}</span>
				</div>
			),
		},
		{
			name: 'Estado',
			selector: row => row.status,
			cell: (row) => (
				<div>
					<StatusSpan status={row.status}/>
				</div>
			),
		},
	]
	const customTable = {
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
	const expComp = ({ data }) => {

		const filtered = statData.filter((item)=>item.reid === data.id)

		return (
			<div style={{margin: '20px 0 10px 50px',padding: '1opx', display: 'flex', flexDirection : 'column', gap: '.5rem'}}>				
				<h6>Actualizaciones: </h6>
				{filtered.length>0?(
					<Fragment>
					<Row>
						<Col>
							<p>Usuario</p>
						</Col>
						<Col>
							<p>Estado</p>
						</Col>
						<Col>
							<p>Fecha</p>
						</Col>
					</Row>
					{filtered.map((item,i)=>(
						<Fragment key={i}>
							
							<Row>
								<Col>
									{item.usna}
								</Col>
								<Col>
									{item.stau}
								</Col>
								<Col>
									{item.date}
								</Col>
							</Row>
						</Fragment>
	
					))}
					</Fragment>
				):(
					<p>No hay datos aun</p>
				)}
			</div>		
		)
	}

	//Encontrar el nombre del cliente
	function getCliName(cli){
		const matchCli = cliData.find(it => it.ced === cli)
		if(matchCli){
			return matchCli.name
		}else{
			return 'No encontrado'
		}
	}	
	
	useEffect(()=>{
		reqDat()
	},[])


	return (
		<Fragment>
			<Breadcrumb title="Lista de Pedidos" />
			{/* <!-- Container-fluid starts--> */}
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>															
								<DataTable
									columns={col}
									data={reqData}
									multiSelectOption={false}
									pageSize={10}
									pagination={true}
									customStyles={customTable}
									expandableRows
									expandableRowsComponent={expComp}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container> 
			{/* <!-- Container-fluid Ends--> */}
		</Fragment>
	);
};

export default Listrequests;
