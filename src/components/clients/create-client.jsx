import React, { Fragment, useState, useEffect } from "react";
import axios from 'axios';
import { toast,ToastContainer } from "react-toastify";
import { NumericFormat } from 'react-number-format';
import {  useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import ApiUrls from "../../constants/api-urls";
import { useContext } from "react";
import { UserContext } from "../../constants/user-data";

const Add_client = () => {

    const {id = ''}=useParams();

    const { userData } = useContext(UserContext)
	const baseUrl = ApiUrls.cliUrl;
	const userUrl = ApiUrls.usersUrl;
    const history = useNavigate();
	const [data, setData] = useState([]);
	const [uData, setUData] = useState([]);
    const [edit, setEdit] = useState(false)

    const [client, setClient] = useState({
		ced: '',
		name: '',
		last: '',
		email: '',
		phone: '',
        city: '',
		direc: '',
		cod: '',
		salerid: '',
        saler: '',
	});

    const requestGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data)
            let cli = response.data.find(obj => obj.id.toString() === id.toString())
			
			if(cli){
				setEdit(true)
				client.ced=cli.ced
				let names = cli.name.toString().split(" ")
				client.name = names[0]
				client.last = names[1]
                client.email=cli.email
                client.phone=cli.phone
                client.city=cli.city
                client.direc=cli.direc
                client.cod=cli.cod
                client.salerid=cli.salerid
                client.saler=cli.saler
			}
        })
    }

    function getSaler(){
        let saleMan 
        if(client.salerid === null){
            let cli = data.find(obj => obj.id.toString() === id.toString())
            if(cli){
                saleMan = cli.saler
            }
        }else{
            if(userData){
                client.saler = userData.name
                client.salerid = userData.id
                saleMan = userData.name
            }else{
                saleMan = 'Usuario'
            }
        }
        return saleMan
    }

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

			f.append("saler", client.salerid);
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
                                            displayType={edit?"text":''}
                                            value={client.ced || ''}
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
                                            value={client.name || ''}
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
                                            value={client.last || ''}
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
                                            value={client.email || ''}
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
                                            value={client.phone || ''}
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
                                            value={client.direc || ''}
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
                                            value={client.city || ''}
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
                                            value={client.cod || ''}
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
                                            value={getSaler()}
                                            name="saler"
                                        />
                                    </div>
                                </div>                                
                                <di>
                                    <div>
                                        <Button type="button" color="primary" onClick={()=>requestPost()}>
                                            Guardar
                                        </Button>
                                        <Button type="button" color="light" onClick={()=>routeChange()}>
                                            Descartar
                                        </Button>
                                    </div>
                                </di>															
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
