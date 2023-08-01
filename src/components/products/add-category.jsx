import React, { Fragment, useState, useEffect } from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import {  useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from "react-toastify";
import ApiUrls from "../../constants/api-urls";

const Add_category = () => {

	const baseUrl = ApiUrls.cateUrl
	const history = useNavigate()
	const [data, setData] = useState([])

	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }

	useEffect(()=>{
        requestGet();
    },[])

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/products/category-list`);
	};

	const [categ, setCateg] = useState({
		name: '',
		desc: '',		
	});

	const handleChange=e=>{		
		const{name, value}=e.target;
		setCateg((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}

	function isEmpty(){
		let key = false
		if(categ.name.length<1){
			key = true
			toast.error("Nombre vacio!");
		}
		return key		
	}

	function isRepeated(){
		let key = false
		if(data.length===0){
            return key;
        }
		if(data.some(value => value.name === categ.name.toUpperCase())){
			toast.error("Nombre ya existe!");
			key = true
		}
		return key
	}

	const requestPost=async()=>{
		if(!isEmpty() && !isRepeated()){
			var f = new FormData()
			f.append("METHOD", 'ADD')
			f.append("name", categ.name)
			f.append("desc", categ.desc)
			await axios.post(baseUrl, f).then(
				response=>{
					setCateg('')
					toast.success("Agregado Exitosamente!")			
				}
			).catch(error=>{
				console.log(error)
			})			
			routeChange()
		}
	}

	return (
		<Fragment>
			<Breadcrumb title="Crear Categoria"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Categoria Nueva</h5>
							</CardHeader>
							<CardBody>
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Nombre
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												id="validationCustom0"
												type="text"
												required=""
												name="name"
												onChange={handleChange}
											/>
										</div>
									</div>
                  					<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Descripcion
										</Label>
										<div className="col-md-8">
											<Input
												className="form-control"
												id="validationCustom0"
												type="text"
												required=""
												maxLength={99}
												name="desc"
												onChange={handleChange}
											/>
										</div>
									</div>												
									<FormGroup>
                                        <Button type="button" color="primary" onClick={()=>requestPost()}>
                                            Guardar
                                        </Button>
                                        <Button type="button" color="light" onClick={()=>routeChange()}>
                                            Descartar
                                        </Button>
                                	</FormGroup>															
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Add_category;
