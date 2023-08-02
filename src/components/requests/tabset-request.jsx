import React, { Fragment, useState, useEffect } from "react";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Button, Form, Input, Label, FormGroup, Col, Row } from "reactstrap";
import axios from 'axios'
import { NumericFormat } from "react-number-format";
import Autocomplete from '@mui/joy/Autocomplete';
import './style.scss'
import { toast } from "react-toastify";
import ApiUrls from "../../constants/api-urls";
import { useContext } from "react";
import { UserContext } from "../../constants/user-data";
import { useNavigate } from "react-router-dom";

const TabsetPage = () => {

	const {userData} = useContext(UserContext)
    const history = useNavigate();
	const [proData, setProData] = useState([])
	const [reno, setReNo] = useState([])
	const [varsData, setVarsData] = useState([])
	const [reqData, setReqData] = useState([])
	const [priceType, setPriceType] = useState('normal')


	const [ced, setCed] = useState(null);
	const [name, setName] = useState(null);
	const [subtotal, setSubtotal] = useState('0.00');
	const [iva, setIva] = useState('0.00');
	const [deliver, setDeliver] = useState('0.00');
	const [total, setTotal] = useState('0.00');


	const [req, setReq] = useState({
		p_meth: 'Efectivo',
		city: '',
		dir: '',
		s_meth: 'Fisica',
		saler: '1',
		descrip: '',
		quant: '0',		
	})

	const hanReq = e => {		
		const{name, value}=e.target;
		setReq((prevState)=>({
			...prevState,
			[name]: value,
		}))		
	}

	const hanPrice = e => {		
		const value=e.target.value
		setPriceType(value)					
		setInputFields([{id: '', prod: '', var_id:'', var:'', disct:'', quant: '', u_price: '', total: '0.00', iva: '',stock:'' }])		
		setIva('0.00')
		setDeliver('')
		setSubtotal('0.00')
		setTotal('0.00')

	}

	const getAutoData=async()=>{		
		await axios.get(ApiUrls.requUrl+"?METHOD=NORE").then(response=>{
			if(response.data.re_no){
				setReNo(response.data.re_no)
			}else{
				setReNo('1')
			}
		})
		await axios.get(ApiUrls.cliUrl+"?METHOD=DATA").then(response=>{
			setReqData(response.data)							
		})
		await axios.get(ApiUrls.prodUrl+"?METHOD=DATA").then(response=>{
			setProData(response.data)							
		})		
		await axios.get(ApiUrls.varsUrl+"?METHOD=DATA").then(response=>{
			setVarsData(response.data)							
		})
	}	

	/* InputFields code */
	const [inputFields, setInputFields] = useState([{id: '', prod: '', var_id:'', var:'', disct:'', quant: '', u_price: '', total: '0.00', iva: '', stock:'' }])

	const addInputFields = () => {
	  setInputFields([...inputFields, {id: '', prod: '', var_id:'', var:'', disct:'', quant: '', u_price: '', total: '0.00', iva: '', stock:'' }]);
	}
  
	const handleInputChange = (index, newValue, name) => {
		const values = [...inputFields];
		values[index][name] = newValue;
		setInputFields(values);

		let z = 0;

		inputFields.forEach((obj) => {
			z += Number(obj.total)
		})

		let i = (z*0.12).toFixed(2)
		z=z.toFixed(2)
		let t = Number(i) + Number(z) + Number(deliver)


		setIva(i)
		setSubtotal(z)
		setTotal(t)
	}
  
	const handleDeleteFields = (index) => {
		const values = [...inputFields];
		values.splice(index, 1);
		setInputFields(values);

		let z = 0;

		values.forEach((obj) => {
			z += Number(obj.total)
		})

		let i = (z*0.12).toFixed(2)
		z=z.toFixed(2)
		let t = Number(i) + Number(z) + Number(deliver)

		setIva(i)
		setSubtotal(z)
		setTotal(t)
	}

	function emptyFields(){
		let key = true

		if(reno.length < 0){
			key = false
		}
		if(inputFields.length > 0	){
			if(ced === null || ced === '' || name === null || name === ''){
				toast.error("Cliente Incompleto");
				key = false
			}else {
				let q = 0
				inputFields.forEach((item, i) => {
					
					if(item.id === null || item.id === ''){				
						toast.error("Producto Incompleto");
						key = false
					}else if(item.var_id === null || item.var_id === ''){				
						toast.error("Producto Incompleto");
						key = false
					}else if(item.quant === null || item.quant === '' || item.quant === 0){
						toast.error("Producto Incompleto");
						key = false
					}
					q = Number(q) + 1
				})
				req.quant=q								
			}			
		}else{
			key = false
		}
			
			
		
		return key
	}

	/* End InputFields code */
	const postReq = async() => {
		if(emptyFields()){
			var f = new FormData();   
			f.append("METHOD", "ADD");
			f.append("ced", ced);
			f.append("reno", reno)
			f.append("p_type", priceType)
			f.append("p_meth", req.p_meth);
			f.append("city", req.city);
			f.append("dir", req.dir);
			f.append("s_meth", req.s_meth);
			f.append("saler", req.saler);
			f.append("descrip", req.descrip);			
			f.append("deliver", deliver)
			f.append("iva", iva)
			f.append("total", Number(total).toFixed(2));
			f.append("items", JSON.stringify(inputFields))	
					
			await axios.post(ApiUrls.requUrl, f).then(response=>{
				setReq({
					p_meth: 'Efectivo',
					city: '',
					dir: '',
					s_meth: 'Fisica',
					saler: '1',
					descrip: '',
					quant: '0',
					stock: '',
				});
				setCed(null)
				setName(null)
				setPriceType('normal')
				setInputFields([{id: '', prod: '', var_id:'', var:'', disct:'', quant: '', u_price: '', total: '0.00', iva: '', stock:'' }])
				setDeliver('')
				setIva('0.00')
				setTotal('0.00')
				setSubtotal('0.00')
				routeChange()
				toast.success("Pedido registrado")
			}).catch(error=>{
			console.log(error);
			});		
		}
	}

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/requests/list-requests`);
	};

	useEffect(() => {
		getAutoData()
	},[])
	
	const op_ced = reqData.map(item => item.ced) 
	const op_name = reqData.map(item => item.name) 
	const op_pro_name = proData.map(item => item.name)	
	
	function loadProdVars(prod){	
		let op_pro_var = []
		if(prod !== ''){
			op_pro_var = varsData
    		.filter(product => product.prod === prod)
    		.map(product => product.name)		
		}
		return op_pro_var			
	}

	//Calcula el precio total sin iva
	function calcPrice(pr_x, qu_x, di_x){
		let iva = 1.12
		let a = pr_x !== "" ? pr_x : 0
		//Precio sin iva
		a = a/iva
		let b = qu_x !== "" ? qu_x : 0
		let c = di_x !== "" ? di_x : 0

		let r

		if(c !== 0){
			r = ((a * b)-(a * b)*(c/100)).toFixed(2)
		}else{
			r = (a * b).toFixed(2)
		}		

		return r
	}	

	//Calcula unicamente el iva total de cada item
	function calcIva(pr_x, qu_x, di_x){
		let iva = 1.12
		let a = pr_x !== "" ? pr_x : 0
		//Precio sin iva
		a = a/iva
		let b = qu_x !== "" ? qu_x : 0
		let c = di_x !== "" ? di_x : 0

		let r 
		if(c !== 0){
			r = ((a * b)-(a * b)*(c/100)).toFixed(2)
		}else{
			r = (a * b).toFixed(2)
		}	
		r = r*0.12

		return r.toFixed(2)
	}

	return (
		<Fragment>
			<div>
				<Tabs>
					<TabList className="nav nav-tabs tab-coupon">
						<Tab className="nav-link">Informacion</Tab>
						<Tab className="nav-link">Detalle</Tab>
					</TabList>

					<TabPanel>
						<Form className="needs-validation">
							<h4>General</h4>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Ced. Cliente
								</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<Autocomplete
										value={ced}
										onChange={(event, newValue) => {
										  setCed(newValue)
										  const matchingReq = reqData.find(obj => obj.ced === newValue)
										  if (matchingReq) {
											setName(matchingReq.name)
											setReq((prevState) => ({ ...prevState, dir: matchingReq.direc}))
											setReq((prevState) => ({ ...prevState, city: matchingReq.city}))
										  } else{
											setName(null)
										  }										
										}}
										options={op_ced}
										sx={{ borderRadius:"3px" }}	
										noOptionsText="No coincide ninguno"
										isOptionEqualToValue={(option, value) => option.id === value.id}
									/>
								</div>
							</div>		
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Nombre
								</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<Autocomplete
										value={name}
										onChange={(event, newValue) => {
											setName(newValue)
											const matchingReq = reqData.find(obj => obj.name === newValue)
											if (matchingReq) {
												setCed(matchingReq.ced)
												setReq((prevState) => ({ ...prevState, dir: matchingReq.direc}))
												setReq((prevState) => ({ ...prevState, city: matchingReq.city}))
											} else{
												setCed(null)
											}
										}}
										options={op_name}
										sx={{ borderRadius:"3px" }}
										noOptionsText="No coincide ninguno"
										isOptionEqualToValue={(option, value) => option.id === value.id}
									/>
								</div>
							</div>	
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4"><span>*</span> Precio</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												onChange={hanPrice}
												checked={priceType === "normal"}
												value="normal"
												name="price_type"
											/>
											Efectivo
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												onChange={hanPrice}
												checked={priceType === "credito"}
												value="credito"
												name="price_type"
											/>
											Credito
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												onChange={hanPrice}
												checked={priceType === "distribuidor"}
												value="distribuidor"
												name="price_type"
											/>
											Distribuidor
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"	
												onChange={hanPrice}
												checked={priceType === "plaza"}
												value="plaza"
												name="price_type"											
											/>
											Plaza
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												onChange={hanPrice}
												checked={priceType === "especial"}
												value="especial"
												name="price_type"
											/>
											Especial
										</Label>
									</FormGroup>									
								</div>
							</div>												
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4"><span>*</span> Forma de Pago</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="p_meth"
												checked={req.p_meth === "Efectivo"}
												onChange={hanReq}
												value="Efectivo"
											/>
											Efectivo
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="p_meth"
												checked={req.p_meth === "Tarjeta"}
												onChange={hanReq}
												value="Tarjeta"
											/>
											Tarjeta
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="p_meth"
												checked={req.p_meth === "Credito Int."}
												onChange={hanReq}
												value="Credito Int."
											/>
											Credito Int.
										</Label>
									</FormGroup>									
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Ciudad
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										value={req.city || ''}
										type="text"
										name="city"
										onChange={hanReq}
									/>
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Direccion
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input
										value={req.dir || ''}
										type="text"
										name="dir"
										onChange={hanReq}
									/>
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4"><span>*</span> Tipo de Entrega</Label>
								<div className="col-xl-8 col-md-7 px-1">
									<FormGroup className="m-checkbox-inline mb-0 custom-radio-ml d-flex radio-animated">
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="s_meth"
												onChange={hanReq}
												checked={req.s_meth === "Fisica"}
												value="Fisica"
											/>
											Fisica
										</Label>
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="s_meth"
												checked={req.s_meth === "Encomienda"}
												onChange={hanReq}
												value="Encomienda"
											/>
											Encomienda
										</Label>										
										<Label className="d-block">
											<Input
												className="radio_animated"
												type="radio"
												name="s_meth"
												checked={req.s_meth === "Retiro Local"}
												onChange={hanReq}
												value="Retiro Local"
											/>
											Retiro Local
										</Label>	
									</FormGroup>									
								</div>
							</div>
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									<span>*</span> Usuario
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<Input										
										type="text"
										value={userData?userData.name:'Cargando...'}
										readOnly
									/>
								</div>
							</div>			
							<div className="form-group row">
								<Label className="col-xl-3 col-md-4">
									 Descripcion
								</Label>
								<div className="col-xl-8 col-md-7 p-0">
									<textarea
										className="form-control"
										value={req.descrip || ''}																				
										type="text"
										name="descrip"
										onChange={hanReq}
									/>
								</div>
							</div>							
						</Form>
					</TabPanel>
					<TabPanel>
						<div className="needs-validation">
							<Row>
								<Col style={{display: 'flex', alignItems: 'center'}}>
									<h4>Detalle del Pedido</h4>
								</Col>
								<Col>
									<div className="btn-popup pull-right">
										<Button
											type="button"
											color="secondary"
											onClick={addInputFields}
										>
											<i className="fa fa-plus"/>
										</Button>																		
									</div>													
								</Col>
							</Row>
							
							{inputFields.map((inputField, index) => {
								return(
								<div key={index} style={{marginBottom: '1rem'}}>
									<Row style={{rowGap: '1rem', justifyContent: 'space-between'}}>
										<Col sm='10' md='10' lg='10' xl='11'>
											<Row style={{justifyContent: 'space-between', rowGap: '1rem'}}>
												<Col xl='4' lg='8' md='8' sm='8' xs='12'>
													<Autocomplete
														value={inputField.prod}
														onChange={(event, newValue) => {
															handleInputChange(index,newValue,"prod")	
															if(newValue === null){
																handleInputChange(index,'',"quant")
																handleInputChange(index,'0.00',"total")

															}else{
																if(inputField.quant === ''){
																	handleInputChange(index,'1',"quant")																
																}
															}
															const matchingProd = proData.find(obj => obj.name === newValue)
															if (matchingProd) {
																handleInputChange(index,matchingProd.id,"id")
																switch(priceType){
																	case 'normal':
																		handleInputChange(index,matchingProd.cash,"u_price")
																		break
																	case 'credito':
																		handleInputChange(index,matchingProd.card,"u_price")
																		break
																	case 'distribuidor':
																		handleInputChange(index,matchingProd.dist,"u_price")
																		break
																	case 'plaza':
																		handleInputChange(index,matchingProd.plaza,"u_price")
																		break
																	case 'especial':
																		handleInputChange(index,matchingProd.special,"u_price")
																		break
																}
																handleInputChange(index,calcPrice(inputField.u_price,inputField.quant,inputField.disct),"total")
																handleInputChange(index,calcIva(inputField.u_price,inputField.quant,inputField.disct),"iva")

															} else{
																handleInputChange(index,null,"id")
															}
															handleInputChange(index, '', "var")															
															handleInputChange(index, '', "var_id")
															handleInputChange(index,'',"stock")

															}}
														options={op_pro_name}
														sx={{ borderRadius:"3px" }}	
														noOptionsText="No coincide ninguno"
														isOptionEqualToValue={(option, value) => option.id === value.id}
														placeholder="Producto"
													/>
												</Col>
												<Col xl='3' lg='4' md='4' sm='4' xs='12'>
													<Autocomplete
														value={inputField.var}	
														onChange={(event, newValue) => {
															handleInputChange(index, newValue, "var")
															const matchingVar = varsData
																.filter(obj => obj.prod === inputField.id)
																.find(obj => obj.name === newValue)
															if (matchingVar) {
																handleInputChange(index,matchingVar.id,"var_id")
																handleInputChange(index,matchingVar.stock,"stock")

															} else{
																handleInputChange(index,null,"var_id")
																handleInputChange(index,'',"stock")
															}
														}}																									
														options={loadProdVars(inputField.id)}
														sx={{ borderRadius:"3px" }}	
														noOptionsText="No coincide ninguno"
														isOptionEqualToValue={(option, value) => option.id === value.id}
														placeholder="Variacion"
													/>
												</Col>
												<Col xl='2' lg='4' md='4' sm='4' xs='4'>
													<NumericFormat
														value={inputField.disct || ''}
														decimalScale={0}
														allowNegative={false}
														placeholder="Descuento"
														customInput={Input}
														maxLength={3}
														onChange={(e)=>{																														
															handleInputChange(index,e.target.value,"disct")
															handleInputChange(index,calcPrice(inputField.u_price,inputField.quant,inputField.disct),"total")
															handleInputChange(index,calcIva(inputField.u_price,inputField.quant,inputField.disct),"iva")
														}}
														allowLeadingZeros={false}
														isAllowed={(values) => {
															const {floatValue} = values
															if(floatValue > 100 || floatValue < 1){																
																return 0
															}else{
																
																return 100
															}
														}}
													/>
												</Col>
												<Col xl='2' lg='4' md='4' sm='4' xs='4'>
													<NumericFormat
														value={inputField.quant || ''}
														decimalScale={2}
														allowNegative={false}
														placeholder="Cantidad"
														customInput={Input}
														allowLeadingZeros={false}		
														onChange={(e)=>{																														
															handleInputChange(index,e.target.value,"quant")															
															handleInputChange(index,calcPrice(inputField.u_price,inputField.quant,inputField.disct),"total")
															handleInputChange(index,calcIva(inputField.u_price,inputField.quant,inputField.disct),"iva")															
														}}																																									
													/>
												</Col>
												<Col xl='1' lg='4' md='4' sm='4' xs='4' style={{ display:'flex', alignItems: 'center' }}>
													<div>
														<span>${inputField.total}   </span>
													</div>												
												</Col>												
											</Row>
										</Col>
										<Col sm='2' md='2' lg='2' xl='1' style={{textAlign: 'end'}}>
											<Button 
												color="warning"
												onClick={() => handleDeleteFields(index)}
												>
												<i className="fa fa-close"></i>
											</Button>
										</Col>												
									</Row>												
								</div>
								)
								})}									
							
							<hr/>		
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h5>Envio</h5>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p>
										<i className="fa fa-dollar"/>
										<NumericFormat
											allowLeadingZeros={false}
											allowNegative={false}
											decimalScale={2}
											value={deliver}		
											onChange={(e)=>{
												setDeliver(e.target.value)
												setTotal(Number(e.target.value) + Number(iva) + Number(subtotal))
											}}
											className="deliver-input"
											placeholder="0.00"
										/>
									</p>
								</Col>
							</Row>					
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h5>Subtotal</h5>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p><i className="fa fa-dollar"/>{subtotal}</p>
								</Col>
							</Row>
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h5>IVA</h5>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p><i className="fa fa-dollar"/>{iva}</p>
								</Col>
							</Row>							
							
							<hr/>
							<Row>
								<Col style={{display: 'flex', justifyContent: 'end'}}>
									<h4>Total</h4>
								</Col>
								<Col>
									<hr/>
								</Col>
								<Col>
									<p><i className="fa fa-dollar"/>
									<NumericFormat
										value={total}
										decimalScale={2}
										displayType="text"
									/>
									</p>
								</Col>
							</Row>
						</div>
					</TabPanel>
				</Tabs>
				<div className="pull-right">
					<Button type="button" color="primary" onClick={postReq}>
						Guardar
					</Button>
				</div>
			</div>
		</Fragment>
	);
};

export default TabsetPage;
