import React, { Fragment, useState } from "react";
import { Card, CardBody,  Col, Container, Row, Form, FormGroup, Input, Label, Button } from "reactstrap";
import {  Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { NumericFormat } from "react-number-format";
import axios from "axios";
import ApiUrls from "../../constants/api-urls";
import { useContext } from "react";
import { UserContext } from "../../constants/user-data";
import { toast } from "react-toastify";

const Edit_user = () => {
	
	const history = useNavigate();

	const {userData, updateUser} = useContext(UserContext)
	const [jsDay, setDayjs] = useState('')
	const [birth, setBirth] = useState('')
	const [phone, setPhone] = useState('')
	const [gen, setGen] = useState('M')
	const [dir, setDir] = useState('')



	const onChangeDate = (value) =>{
		setDayjs(value)
		setBirth(dayjs(jsDay).format('YYYY-MM-DD'))
	}

	const postInfo = async()=>{
		if(birth!==''&&gen!==''&&phone!==''&&dir!==''&&userData){
			var f = new FormData()
			f.append('METHOD', 'UPDINFO')
			f.append('nac', birth)
			f.append('phone', phone)
			f.append('dir', dir)
			f.append('gen', gen)
			f.append('id', userData.id)
			await axios.post(ApiUrls.usersUrl, f).then(response =>{
				if(response.data === true){
                    axios.get(ApiUrls.usersUrl).then(response=>{
                        const matchUser = response.data.find(us => us.id === userData.id)
                        if(matchUser){
                            updateUser(matchUser)
							toast.success('Informacion Actualizada')
							history(`${process.env.PUBLIC_URL}/settings/profile`);
                        }else{

							toast.error('Algo salio mal')
						}
                    })                    
                }else{
					toast.error('Algo salio mal')
                }
			}).catch(err=>{
				toast.error('Algo salio mal')
				console.log(err)
			})
		}else{
			toast.error('Tienes campos incompletos')
		}
	}

	return (
		<Fragment>
			<Breadcrumb title="Editar Perfil"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>							
							<CardBody>
								<Form className="needs-validation user-add">
									<h4>Detalles de Usuario</h4>																				
									<FormGroup className="row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Telefono
										</Label>
										<div className="col-xl-8 col-md-7">
											<NumericFormat  
												customInput={Input}
												maxLength={10}												
												allowNegative={false}
												decimalScale={0}
												allowLeadingZeros
												onChange={(e)=>{
													setPhone(e.target.value)
												}}
												value={phone || ''}
                                            />	
										</div>
									</FormGroup>	
									<FormGroup className="row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Direccion
										</Label>
										<div className="col-xl-8 col-md-7">
											<Input
												type="text"
												maxLength={250}
												value={dir}
												onChange={(e)=>{
													let d = e.target.value
													setDir(d)
												}}
											/>
										</div>
									</FormGroup>	
									<div className="form-group row needs-validation">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Genero
										</Label>
										<div className="col-xl-8 col-md-7 px-1">
											<FormGroup className="m-checkbox-inline mb-2 custom-radio-ml d-flex radio-animated">
												<Label className="d-block">
													<Input
														className="radio_animated"
														type="radio"
														name="gender"
														value="M"
														onChange={(e)=>{
															let newVal = e.target.value
															setGen(newVal)
														}}
														defaultChecked
													/>
													Masculino
												</Label>
												<Label className="d-block">
													<Input
														className="radio_animated"
														type="radio"
														name="gender"
														value="F"
														onChange={(e)=>{
															let newVal = e.target.value
															setGen(newVal)
														}}

													/>
													Femenino  
												</Label>
												<Label className="d-block">
													<Input
														className="radio_animated"
														type="radio"
														name="gender"
														value="O"
														onChange={(e)=>{
															let newVal = e.target.value
															setGen(newVal)
														}}
													/>
													Otro
												</Label>
											</FormGroup>									
										</div>
									</div>	
									<div className="form-group row">
										<Label className="col-xl-3 col-md-4">
											<span>*</span> Fecha de Nacimiento:
										</Label>
										<div className="col-md-8">
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DesktopDatePicker
												format="YYYY-MM-DD"																								
												openTo="day"
												minDate={dayjs('1960-01-01')}
												views={['year','month', 'day']}
												value={jsDay}
												onChange={(newValue) => {
												  onChangeDate(newValue)
												}}
											/>
										</LocalizationProvider>
										</div>
									</div>	
									<FormGroup>
									<Button type="button" color="primary" onClick={()=>postInfo()}>
										Guardar
									</Button>
									<Link to='/settings/profile'>
										<Button type="button" color="light">
											Descartar
										</Button>
									</Link>
								</FormGroup>											
								</Form>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default Edit_user;
