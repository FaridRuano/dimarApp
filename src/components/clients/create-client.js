import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';
import {  useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";

const Add_client = () => {
	const baseUrl = "http://localhost:8080/modelsDimar/models/di_clients/clients.php";
    const history = useNavigate();
	const [data, setData] = useState([]);

    const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }

    const [client, setClient] = useState({
		ced: '',
		name: '',
		last: '',
		email: '',
		phone: '',
        city: '',
		direc: '',
		cod: '',
		saler: '1',
	});

    const handleChange=e=>{		
		const{name, value}=e.target;
		setClient((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}

    function isValidEmail(){
		let email = client.email;
		let validate = /\S+@\S+\.\S+/.test(email);
		if(!validate){
			toast.error("Email no es valido");
		}
		return !validate;
	}

    function isRepeated(){
		let key = false;
        if(data.length===0){
            return key;
        }
		let cedF = client.ced;
		let repeatedCed = data.some(value => value.ced === cedF);	
		let emailF = client.email;
		let repeatedEmail = data.some(value => value.email === emailF);	
		if(repeatedCed){
			toast.error("Cedula ya existe");
			key = true;
		}		
		if(repeatedEmail){
			toast.error("Email ya existe");
			key = true;
		}
		return key;
	}

    function isEmpty(){
		let key = false;
		let ced = client.ced;
		let name = client.name;
		let last = client.last;		
		let email = client.email;		

		if(ced.length<10){
			toast.error("Cedula incompleta");
			key = true;
		}
		if(name.length<3){
			toast.error("Nombre incompleto");
			key = true;
		}
		if(last.length<3){
			toast.error("Apellido incompleto");
			key = true;
		}	
		if(email.length>0){
            let x = isValidEmail()
			if(x){
			    key = true;
            }
		}				
		return key;
	}

    const requestPost=async()=>{	
		let emptiness, repeatness = false;
		emptiness = isEmpty();
		repeatness = isRepeated();
				
		if(!emptiness && !repeatness){		
			var f = new FormData();   
			f.append("ced", client.ced);
			f.append("name", client.name);
			f.append("last", client.last);
			f.append("email", client.email);
			f.append("phone", client.phone);
			f.append("city", client.city);
			f.append("direc", client.direc);
			f.append("cod", client.cod);
			f.append("saler", client.saler);
			f.append("METHOD", "ADD");
			await axios.post(baseUrl, f).then(response=>{
				setClient('');
			}).catch(error=>{
			console.log(error);
			});		
			toast.success("Agregado Exitosamente!");
			routeChange();
		}
	}	

    const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/clients/list-clients`);
	};

    useEffect(()=>{
        requestGet();
    },[])

	return (
		<Fragment>
			<Breadcrumb title="Crear Cliente"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Datos del Cliente</h5>
							</CardHeader>
							<CardBody>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Cedula
                                    </Label>
                                    <div className="col-md-4">
                                        <NumericFormat  
                                            className="form-control"
                                            customInput={Input}
                                            name='ced'
                                            maxLength={13}												
                                            allowNegative={false}
                                            decimalScale={0}
                                            allowLeadingZeros
                                            onChange={handleChange}
                                            />												
                                    </div>																			
                                </div>	
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Nombre
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={49}																
                                            name="name"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>	
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Apellido
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={49}																
                                            name="last"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>	
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Email
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={99}																
                                            name="email"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Telefono
                                    </Label>
                                    <div className="col-md-4">
                                        <NumericFormat  
                                            className="form-control"
                                            customInput={Input}
                                            name='phone'
                                            maxLength={10}												
                                            allowNegative={false}
                                            decimalScale={0}
                                            allowLeadingZeros
                                            onChange={handleChange}
                                            />												
                                    </div>																			
                                </div>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Dirección
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={249}																
                                            name="direc"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Ciudad
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={100}
                                            name="city"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Código
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            maxLength={10}																
                                            name="cod"
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <Label className="col-xl-3 col-md-4">
                                        <span>*</span> Vendedor
                                    </Label>
                                    <div className="col-md-8">
                                        <Input
                                            className="form-control"
                                            type="text"
                                            readOnly
                                            value="Usuario"
                                            name="saler"
                                        />
                                    </div>
                                </div>                                
                                <FormGroup>
                                    <div>
                                        <Button type="button" color="primary" onClick={()=>requestPost()}>
                                            Guardar
                                        </Button>
                                        <Button type="button" color="light" onClick={()=>routeChange()}>
                                            Descartar
                                        </Button>
                                    </div>
                                </FormGroup>															
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer theme="colored"/>								
		</Fragment>
	);
};

export default Add_client;
