import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Button, Card, CardBody, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { toast } from "react-toastify";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'
import ApiUrls from "../../constants/api-urls";

const Add_product = () => {

	const {id = ''}=useParams();
	const cateUrl = ApiUrls.cateUrl
	const prodUrl = ApiUrls.prodUrl
	const editUrl = ApiUrls.prodUrl+`?id=${id}`
	const history = useNavigate();
	const [data, setData] = useState([]);
	const [edit, setEdit] = useState(false);
	
	const [product, setProduct] = useState({
		cate: '',
		name: '',
		cash: '',
		card: '',
		dist: '',
		plaza: '',
		special: '',
		descrip: '',
		unit: '',
		provider: '',
	})

	const getCateg=async()=>{
        await axios.get(cateUrl).then(response=>{
            setData(response.data);
        })
    }
	
	const getProd=async()=>{
		await axios.get(editUrl).then(response=>{
			product.name=response.data.name
			product.cate=response.data.cate
			product.cash=response.data.cash
			product.card=response.data.card
			product.dist=response.data.dist
			product.plaza=response.data.plaza
			product.special=response.data.special
			product.descrip=response.data.descrip
			product.unit=response.data.unit
			product.provider=response.data.provider
			setColors(response.data.vars)
		})
	}


	const hanChaPro=e=>{		
		const{name, value}=e.target;
		setProduct((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}
	/* Dynamic Add */
	const [colors, setColors] = useState([])
	const [del_colors, setDelColors] = useState([])


	const handleAdd=()=>{
		const e=[...colors,{id:'',name:''}]
		setColors(e)				
	}

	const hanChaColors=(e,i)=>{
		const inputdata=[...colors]
		inputdata[i].name=e.target.value;
		setColors(inputdata)		
	}

	const hanDelColors=(i,del_id)=>{
		const deletVal=[...colors]
		deletVal.splice(i,1)	
		const deletVal2 = [...del_colors];
		deletVal2.push(del_id)
		setColors(deletVal)  
		setDelColors(deletVal2)
	}
	/* End Add */

	function isEmpFields(){
		if(product.cate.length<1){
			toast.error("Escoga una categoria",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(product.name.length<1){
			toast.error("Nombre incompleto",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(product.cash.length<1){
			toast.error("Precio de contado vacio",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(product.card.length<1){
			toast.error("Precio de credito vacio",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(product.dist.length<1){
			toast.error("Precio de providerbuidor vacio",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(colors.length<1){
			toast.error("Debe existir al menos un color o variacion",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(colors[0].length<1){
			toast.error("Campo de color o variacion esta vacio",{pauseOnHover:false,theme:"colored"})
			return true
		}			
		if(product.unit.length<1){
			toast.error("Escoga la unidad del producto",{pauseOnHover:false,theme:"colored"})
			return true
		}
		if(product.provider.length<1){
			toast.error("Escoga un providerbuidor",{pauseOnHover:false,theme:"colored"})
			return true
		}
		for (let i = 0; i < colors.length; i++)	{
			if(colors[i].length<1){
				colors.splice(i, 1)
				i--
			}
		}
		return false
	}

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/products/product-list`);
	};	

	const reqPost=async()=>{
		if(!edit){
			if(!isEmpFields()){		
				var f = new FormData()
				f.append("METHOD", "ADD")
				f.append("name", product.name)
				f.append("cate", product.cate)
				f.append("cash", product.cash)
				f.append("credit", product.card)
				f.append("distri", product.dist)
				f.append("plaza", product.plaza)
				f.append("special", product.special)
				f.append("descrip", product.descrip)
				f.append("unit", product.unit)
				f.append("provider", product.provider)
				f.append("vars", JSON.stringify(colors))
				await axios.post(prodUrl, f).then(
					response=>{
						setColors([])
						setProduct('')
						routeChange()
						toast.success('Producto agregado')
					}
				).catch(err=>{
					console.log(err)
				})
			}
		}else{
			if(!isEmpFields()){		
				var f = new FormData()
				f.append("METHOD", "PUT")
				f.append("id", id)
				f.append("name", product.name)
				f.append("cate", product.cate)
				f.append("cash", product.cash)
				f.append("credit", product.card)
				f.append("distri", product.dist)
				f.append("plaza", product.plaza)
				f.append("special", product.special)
				f.append("descrip", product.descrip)
				f.append("unit", product.unit)
				f.append("provider", product.provider)
				f.append("vars", JSON.stringify(colors))
				f.append("del_vars", JSON.stringify(del_colors))
				await axios.post(prodUrl, f).then(
					response=>{
						setColors([])
						setProduct('')
						routeChange()
						toast.success('Producto editado')
					}
				).catch(err=>{
					console.log(err)
				})
			}
		}
		
	}

	useEffect(()=>{
		if(id !== ''){
			setEdit(true)
			getProd()
		}
        getCateg()
    },[])

	return (
		<Fragment>
			<Breadcrumb title="Crear Producto"/>
			<Container fluid={true}>
				<Row className="product-adding">
						<Card>							
							<CardBody>
								<div className="digital-add needs-validation">
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Categoria
										</Label>
										<select 
											className="form-select"											
											onChange={hanChaPro}
											name="cate"
											value={product.cate || ''}
										>
											<option value="">--Seleccionar--</option>
											{data.map((categories)=>(
												<option key={categories.id} value={categories.id}>{categories.name}</option>
											))}
										</select>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label pt-0">
											<span>*</span> Nombre
										</Label>
										<Input
											className="form-control"
											type="text"
											name="name"
											onChange={hanChaPro}
											value={product.name || ''}
										/>
									</FormGroup>		
									<FormGroup>		
										<Label className="col-form-label">
											<span>*</span> Precios
										</Label>									
									<Row>
										<Col xs='4'>
											<FormGroup>											
											<NumericFormat
												className="form-control"
												name="cash"
												onChange={hanChaPro}
												placeholder="Contado"
												decimalScale={2}
												value={product.cash || ''}
											/>
											</FormGroup>
										</Col>
										<Col xs='4'>
											<FormGroup>											
											<NumericFormat
												className="form-control"
												name="card"
												onChange={hanChaPro}
												placeholder="Credito"
												decimalScale={2}
												value={product.card || ''}
											/>
											</FormGroup>
										</Col>
										<Col xs='4'>
											<FormGroup>											
											<NumericFormat
												className="form-control"
												name="dist"
												onChange={hanChaPro}
												placeholder="Distribuidor"
												decimalScale={2}
												value={product.dist || ''}
											/>
											</FormGroup>
										</Col>
										<Col xs='4'>
											<FormGroup>											
											<NumericFormat
												className="form-control"
												name="plaza"
												onChange={hanChaPro}
												placeholder="Plaza"
												decimalScale={2}
												value={product.plaza || ''}
											/>
											</FormGroup>
										</Col>
										<Col xs='4'>
											<FormGroup>											
											<NumericFormat
												className="form-control"
												name="special"
												onChange={hanChaPro}
												placeholder="Especial"
												decimalScale={2}
												value={product.special || ''}
											/>
											</FormGroup>
										</Col>
									</Row>	
									</FormGroup>										
									<FormGroup>
										<Label className="col-6">
												<span>*</span> Colores o Variaciones
										</Label>
										<Button style={{padding: "1px"}} className="col-2 pull-right" onClick={()=>handleAdd()}>Agregar</Button>
									</FormGroup>
									<FormGroup>
										{colors.map((color,i)=>{
											return(
											<FormGroup key={i}>
												<div style={{ position: "relative" }}>
														<Input 
															style={{ paddingRight: "40px"}}
															value={color.name} 
															onChange={e=>hanChaColors(e,i)} 
															className="form-control"
															id="validationCustom02"
															type="text"
															/>
														<button 
															style={{ color:"black", border: "none", backgroundColor: "#e7e7e7",position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
															color="warning"
															onClick={()=>{
																if(color.id !=''){
																	if(window.confirm("Estas seguro que deseas eliminar?")){
																		hanDelColors(i,color.id)																	
																	}
																}else{
																	hanDelColors(i,color.id)
																}
															}}
															>
																<i className="fa fa-close"></i>
														</button>
												</div>												
											</FormGroup>
											)
										})}										
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label">
											Descripcion
										</Label>
										<Input
											className="form-control"
											type="text"
											name="descrip"
											onChange={hanChaPro}
											value={product.descrip || ''}
										/>
									</FormGroup>									
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Unidad
										</Label>
										<select 
											className="form-select" 
											required="" 
											onChange={hanChaPro}
											name="unit"
											value={product.unit || ''}
										>
											<option value="">--Seleccionar--</option>
											<option value="metros">Metros</option>
											<option value="unidad">Unidades</option>											
										</select>
									</FormGroup>
									<FormGroup>
										<Label className="col-form-label">
											<span>*</span> Proveedor
										</Label>
										<select 
											className="form-select" 
											required=""
											name="provider"
											onChange={hanChaPro}
											value={product.provider || ''}
										>
											<option value="">--Seleccionar--</option>
											<option value="China">China</option>
											<option value="Colombia">Colombia</option>
											<option value="Nacional">Nacional</option>
											<option value="Otro">Otro</option>
										</select>
									</FormGroup>									
									<FormGroup>
										<div>
											<Button type="button" color="primary" onClick={()=>reqPost()}>
												{edit?"EDITAR":"GUARDAR"}
											</Button>
											<Button type="button" color="light" onClick={routeChange}>
												Descartar
											</Button>
										</div>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Add_product;
