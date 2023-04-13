import React, { Fragment, useState, useEffect } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {  useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';


const TabsetUser = () => {
	const baseUrl = "http://localhost:8080/modelsDimar/models/di_users/users.php";
	const history = useNavigate();
	const [data, setData] = useState([]);	
 	
	const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data);
        })
    }

	const [user, setUser] = useState({
		ced: '',
		name: '',
		last: '',
		email: '',
		perm: '',
		suc: '',
	});

	const handleChange=e=>{		
		const{name, value}=e.target;
		setUser((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}

	function isValidEmail(){
		let email = user.email;
		let validate = /\S+@\S+\.\S+/.test(email);
		if(!validate){
			toast.error("Email no es valido");
		}
		return !validate;
	}

	function isRepeated(){
		let cedF = user.ced;
		let repeatedCed = data.some(value => value.ced === cedF);	
		let emailF = user.email;
		let repeatedEmail = data.some(value => value.email === emailF);	
		let key = false;
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
		let ced = user.ced;
		let name = user.name;
		let last = user.last;
		let perm = user.perm;
		let suc = user.suc;

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
		if(perm.length<1){
			toast.error("Cargo incompleto");
			key = true;
		}	
		if(suc.length<1){
			toast.error("Sucursal incompleto");
			key = true;
		}	
		return key;
	}

	const requestPost=async()=>{	
		let emptiness, repeatness, valideteness = false;
		emptiness = isEmpty();
		repeatness = isRepeated();
		valideteness = isValidEmail();
				
		if(!emptiness && !repeatness && !valideteness){		
			var f = new FormData();   
			f.append("ced", user.ced);
			f.append("name", user.name);
			f.append("last", user.last);
			f.append("email", user.email);
			f.append("perm", user.perm);
			f.append("suc", user.suc);
			f.append("METHOD", "ADD");
			await axios.post(baseUrl, f).then(response=>{
				setUser('');
			}).catch(error=>{
			console.log(error);
			});		
			toast.success("Agregado Exitosamente!");
			routeChange();
		}
	}	

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/users/list-user`);
	};

	useEffect(()=>{
        requestGet();
    },[])
	return (
		<Fragment>
			<Tabs>
				<TabList className="nav nav-tabs tab-coupon">
					<Tab className="nav-link">Informacion</Tab>
				</TabList>
				<TabPanel>
					<Form className="needs-validation user-add" noValidate="">
						<h4>Detalles de Usuario</h4>
						<div className="form-group row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Cedula
							</Label>
							<div className="col-md-4">
								<NumericFormat  
									className="form-control"
									customInput={Input}
									name='ced'
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
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Cargo
							</Label>
							<div className="col-xl-8 col-md-7">
								<select className="form-select " name="perm" onChange={handleChange}>
									<option value="">--Seleccionar--</option>
									<option value="CJ">Asesor comercial junior</option>
									<option value="CE">Asesor comercial externo</option>
									<option value="AD">Asistente de compras</option>
									<option value="AC">Asistente cartera</option>
									<option value="ED">Encargada de despachos</option>
									<option value="CA">Cajera</option>
									<option value="GC">Gerente Comercial</option>
									<option value="GG">Gerente General</option>
								</select>
							</div>							
						</FormGroup>
						<FormGroup className="row">
							<Label className="col-xl-3 col-md-4">
								<span>*</span> Sucursal
							</Label>
							<div className="col-xl-8 col-md-7">
								<select className="form-select " name="suc" onChange={handleChange}>
									<option value="">--Seleccionar--</option>
									<option value="AMB">AMBATO</option>
									<option value="GYQ">GUAYAQUIL</option>


								</select>
							</div>							
						</FormGroup>
					</Form>
				</TabPanel>				
			</Tabs>
			<div className="pull-right">
				<Button type="button" color="primary" onClick={()=>requestPost()}>
					Guardar
				</Button>
			</div>
			<ToastContainer theme="colored"/>								
		</Fragment>
	);
};

export default TabsetUser;
