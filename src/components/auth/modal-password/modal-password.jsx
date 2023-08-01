import React, { Fragment,useState, useEffect, useContext } from "react";
import { Button, Card, CardBody, CardHeader, Col, Form, Input, Label, Row } from "reactstrap";
import {  Link, useNavigate, useParams } from "react-router-dom";
import './style.scss'
import ApiUrls from "../../../constants/api-urls";
import { NumericFormat } from 'react-number-format';
import { toast,ToastContainer } from "react-toastify";
import axios from 'axios';
import { X } from "react-feather";
import { UserContext } from "../../../constants/user-data"

const ModalPassword = ({isOpen, onChange }) => {
    
    const baseUrl = ApiUrls.usersUrl

    const [data, setData] = useState([])
    const [usna, setUsna] = useState('')
    const [uspa, setUspa] = useState('')
    const [uspaco, setUspaco] = useState('')
    const { userData, updateUser } = useContext(UserContext)
    const [ctrlUsna, setCntrlUsna] = useState(false)
    const [ctrlPass, setCntrlPass] = useState(false)
    const [ctrlCoPass, setCntrlCoPass] = useState(false)

    const reqGet=async()=>{
        await axios.get(baseUrl).then(response=>{
            setData(response.data)	
        })
    }    

    function cntrlFrm(){
        let res = true
        if(usna.length === 0 || uspa.length === 0 || uspaco.length === 0){
            res = false
            toast.error('Porfavor llena el formulario')
        }
        return res
    }

	const savedData = JSON.parse(localStorage.getItem('DMRPPSRDT'))    

    const reqPost=async()=>{
        if(cntrlFrm()){
            var f = new FormData()
            f.append("METHOD",'UPDPASS')
            f.append("id", userData.id)
            f.append("usna", usna)
            f.append("uspa", uspa)
            await axios.post(baseUrl, f).then(response=>{
                if(response.data === true){
                    axios.get(baseUrl).then(response=>{
                        const matchUser = response.data.find(us => us.id === savedData.id)
                        console.log(matchUser)
                        if(matchUser){
                            updateUser(matchUser)
                        }
                    })                    
                    onChange(false)
                }else{
                    toast.error('Algo salio mal... Intenta más tarde')
                }
            }).catch(err=>{
                console.log(err)
            })
        }		
    }

    useEffect(()=>{
        reqGet()
    },[])

  return (
    <Fragment>
        <div className={isOpen ? 'overlay' : 'overlay-closed'}/>
        <div className={isOpen ? 'modal-warp' : 'modal-warp-closed'}>
            <Card>
                <CardBody>
                    <Row>
                        <Col>
                            <h5>Actualiza tus credenciales</h5>
                        </Col>                        
                    </Row>
                    <div className="separator-20"/>
                    <Form className="needs-validation">                        
                        <div className="form-group row">
                            <Label className="col-xl-3 col-md-4">
                                <span>* </span>Usuario
                            </Label>
                            <div className="col-md-8">
                                <Input
                                    maxLength={50}
                                    name="name"		
                                    onChange={(e)=>{
                                        const alphanumericRegex = /^[a-zA-Z0-9]*$/;
                                        setUsna(e.target.value)
                                        if(e.target.value.length >= 5 && alphanumericRegex.test(e.target.value)){
                                            setCntrlUsna(false)
                                        }else{
                                            setCntrlUsna(true)
                                        }                   
                                    }}
                                    value={usna}
                                    invalid={ctrlUsna}   
                                    autoComplete="off"                       
                                />
                            </div>
                        </div>  
                        {ctrlUsna?(
                            <Row className="form-group">
                                <Col md='4' xl='3'>
                                </Col>
                                <Col md={8}>
                                    <span className="warn-text">
                                        El usuario debe contener entre 5 hasta 50 caracteres y solo
                                        contener letras y/o números
                                    </span>
                                </Col>                                
                            </Row>                      
                        ):(
                            ''
                        )}                         
                        <div className="form-group row">
                            <Label className="col-xl-3 col-md-4">
                                <span>* </span>Contraseña
                            </Label>
                            <div className="col-md-8">
                                <Input
                                    maxLength={50}
                                    name="uspa"		
                                    type="password"
                                    invalid={ctrlPass}
                                    onChange={(e)=>{
                                        const { value } = e.target;
                                        const hasNumber = /\d/.test(value);
                                        const hasLetter = /[a-zA-Z]/.test(value);
                                        const hasSpecialChar = /[^a-zA-Z0-9]/.test(value);
                                        setUspa(value)
                                        if(value.length < 1){
                                            setCntrlPass(false)

                                        }else if(hasNumber && hasLetter && hasSpecialChar && value.length >= 8){
                                            setCntrlPass(false)
                                        }else{
                                            setCntrlPass(true)
                                        }  
                                        if(value === uspaco){
                                            setCntrlCoPass(false)
                                        }else{
                                            setCntrlCoPass(true)
                                        }
                                    }}
                                    value={uspa}
                                />
                            </div>
                        </div>
                        {ctrlPass?(
                            <Row className="form-group">
                                <Col md='4' xl='3'>
                                </Col>
                                <Col md={8}>
                                    <span className="warn-text">
                                        La contraseña debe contener al menos 8 caracteres, y debe
                                        contener letras, números y caracteres especiales
                                    </span>
                                </Col>                                
                            </Row>                      
                        ):(
                            ''
                        )} 
                        <div className="form-group row">
                            <Label className="col-xl-3 col-md-4">
                                <span>* </span>Confirma tu contraseña
                            </Label>
                            <div className="col-md-8">
                                <Input
                                    maxLength={50}
                                    type="password"
                                    name="uspaco"		
                                    onChange={(e)=>{
                                        setUspaco(e.target.value)
                                        if(e.target.value === uspa){
                                            setCntrlCoPass(false)
                                        }else{
                                            setCntrlCoPass(true)
                                        }
                                    }}
                                    value={uspaco}
                                    invalid={ctrlCoPass}
                                />
                            </div>
                        </div>      
                        {ctrlCoPass?(
                            <Row className="form-group">
                                <Col md='4' xl='3'>
                                </Col>
                                <Col md={8}>
                                    <span className="warn-text">
                                        Las contraseñas deben coincidir
                                    </span>
                                </Col>                                
                            </Row>                      
                        ):(
                            ''
                        )}    
                        <div className="separator-20"/>
                        <div className="button-container-2">
                            <Button color="primary" type="button" disabled={ctrlUsna || ctrlPass || ctrlCoPass} onClick={()=>reqPost()}>
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </CardBody>
            </Card>
        </div>
        <ToastContainer theme='colored'/>
    </Fragment>
  )
}

export default ModalPassword