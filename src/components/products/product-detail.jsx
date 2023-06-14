import React, { Fragment, useState, useEffect } from "react"
import Breadcrumb from "../common/breadcrumb"
import "./pro_styles.scss"
import "../../assets/scss/slick.scss"
import "../../assets/scss/slick-theme.scss"
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Button, Card, Col, Container, Row } from "reactstrap"
import axios from 'axios'

const Product_detail = () => {

	const {id}=useParams()
	const baseUrl = `http://localhost:8080/modelsDimar/models/di_products/products.php?METHOD=DETAIL&id=${id}`
	const colorsUrl = 'http://localhost:8080/modelsDimar/models/di_products/variations.php'

    const [data, setData] = useState([])
	const [colors, setColors] = useState([])

	const getProd=async()=>{		
		await axios.get(baseUrl).then(response=>{
            setData(response.data[0])
		})
		await axios.get(colorsUrl+'?id='+id).then(response=>{
			setColors(response.data)
		})
	}	

	const reqPost=async(colorId)=>{
		var f = new FormData()
		f.append("METHOD", "DISPO")
		f.append("id",colorId)		
		await axios.post(colorsUrl,f).then(response=>{
			getProd()
		}).catch(err=>{
			console.log(err)
		})
	}

	useEffect(() => {
		getProd()
	}, []);

	return (
		<Fragment>
			<Breadcrumb title="Detalles del Producto"/>

			<Container fluid={true}>
				<Card>
					<Row className="card-body">						
						<Col>
							<div className="product-page-details product-right mb-0">
								<h2>{data.name}</h2>								
								<hr />
								<Row>
									<Col>
										<h6 className="product-title">Categoria:</h6>
									</Col>
									<Col>
										<p className="pull-left">
											{data.cate}
										</p>
									</Col>
								</Row>
								<Row>
									<Col>
										<h6 className="product-title">Proveedor:</h6>
									</Col>
									<Col>
										<p className="pull-left">
											{data.provider}
										</p>
									</Col>
								</Row>
								<hr />
								<h6 className="product-title">Descripcion:</h6>
								<p>
									{data.descrip}
								</p>
								<hr/>			
								<h6 className="product-title">Precios:</h6>
								<Row>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> {data.cash}</h4>
										<p className="pull-left">
											Contado
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> {data.card}</h4>
										<p className="pull-left">
											Credito
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> {data.dist}</h4>
										<p className="pull-left">
											Distribuidor
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> {data.plaza}</h4>
										<p className="pull-left">
											Plaza
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> {data.special}</h4>
										<p className="pull-left">
											Especial
										</p>
									</Col>
								</Row>								
								<hr />
								<Row xs="3">
									<Col>
										<h6 className="product-title">Variaciones</h6>
									</Col>
									<Col>
										<h6 className="product-title">Stock</h6>
									</Col>
									<Col>
										<h6 className="product-title">Disponibilidad</h6>
									</Col>
								</Row>
								
								<div>
									{colors.map((color,i)=>{
										return (
											<Row key={i} xs="3">
												<Col className="col-variant-name">
													<span>{color.variation} </span>
												</Col>		
												<Col className="col-variant-name">
													<span>{color.stock} </span>
												</Col>										
												<Col>
													<div className="button-dispo" style={{backgroundColor:color.dispo ? 'green':'black'}}  onClick={()=>reqPost(color.id)}>
														<span>											
															{color.dispo?'SI':'NO'}
														</span>
													</div>
												</Col>
											</Row>
										)
									})}
								</div>
								
								<hr/>
								<Row>
									<Col>
										<h6 className="product-title">Unidad:</h6>
									</Col>
									<Col>
										<p className="pull-left">
											{data.unit}
										</p>
									</Col>
								</Row>								
								<hr/>																														
								<div className="m-t-15">
									<Link to={`/products/add-product/${data.id}`}>
										<Button color="primary" className="m-r-10" type="button">
												Editar
										</Button>									
									</Link>
									<Link to={'/products/product-list'}>
										<Button color="dark" className="m-r-10" type="button">
												Volver
										</Button>									
									</Link>
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Product_detail;
