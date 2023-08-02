import React, { Fragment } from "react"
import { Tabs, TabList, TabPanel, Tab } from "react-tabs"
import { User, Unlock } from "react-feather"
import {  useNavigate } from "react-router-dom"
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { useState } from "react"
import axios from "axios"
import ApiUrls from "../../constants/api-urls"
import { useEffect } from "react"
import { useContext } from "react"
import { UserContext } from "../../constants/user-data"
import {toast} from "react-toastify"

const LoginTabset = () => {
	const history = useNavigate();
	const baseUrl = ApiUrls.usersUrl
	const { updateUser } = useContext(UserContext)

	const [diUser, setDiUser] = useState('')
	const [diPass, setDiPass] = useState('')
	const [users, setUsers] = useState([])

	const savedData = JSON.parse(localStorage.getItem('DMRPPSRDT'))

	const routeChange = () => {
		history(`${process.env.PUBLIC_URL}/dashboard`)
	}

	const reqData = async () => {
		await axios.get(baseUrl).then(response=>{
			setUsers(response.data)
		})
	}

	const login = () =>{
		if(diUser.length < 1 || diPass.length < 1){
			toast.warn('Campos vacios')
		}else{
			const matchUser = users.find(us => us.usna === diUser)
			if(matchUser){
				if(matchUser.uspa === diPass){
					toast.success('Bienvenido a Dimar App')
					updateUser(matchUser)
					routeChange()
				}else{
					toast.error('Credenciales incorrectas')
				}
			}else{
				toast.error('Credenciales incorrectas')
			}
			
		}
	}

	useEffect(()=>{
		reqData()
		if(savedData)  {
			routeChange()
		}
	},[])

	return (
		<div>
			<Fragment>
				<Tabs>
					<TabList className="nav nav-tabs tab-coupon">
						<Tab className="nav-link">
							<User />
							Inicio de Sesión
						</Tab>						
					</TabList>
					<TabPanel>
						<Form className="form-horizontal auth-form">
							<FormGroup>
								<Input
									name="diuser"
									type="email"
									className="form-control"
									placeholder="Usuario"
									onChange={(e)=>setDiUser(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<Input
									name="dipass"
									type="password"
									className="form-control"
									placeholder="Contraseña"
									autoComplete="off"
									onChange={(e)=>setDiPass(e.target.value)}
								/>
							</FormGroup>							
							<div className="form-button">
								<Button
									color="primary"
									onClick={() => login()}
								>
									Ingresar
								</Button>
							</div>
							<div className="form-footer">
								<span>Si no tienes credenciales contacta a tu superior</span>								
							</div>
						</Form>
					</TabPanel>					
				</Tabs>
			</Fragment>
		</div>
	);
};

export default LoginTabset;
