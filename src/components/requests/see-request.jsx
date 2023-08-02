import React, { Fragment, useContext } from "react";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Col, Container, Row, Media, Button, Label, FormGroup } from "reactstrap";
import { useParams, Link } from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import ApiUrls from "../../constants/api-urls";
import { useEffect } from "react";
import './style.scss'
import { UserContext } from "../../constants/user-data";
import { toast } from "react-toastify";
import UserComentary from "./components/user-comentary/user-comentary";
import { Image, X } from "react-feather";

const Seerequest = () => {

    
	const {id = ''}=useParams();
    const [reqData, setReqData] = useState([])
    const [detData, setDetData] = useState([])
    const [cliData, setCliData] = useState([])
    const [proData, setProData] = useState([])
    const [varData, setVarData] = useState([])
    const [obvsData, setObvsData] = useState([])
    const {userData} = useContext(UserContext)

    //Obvs data
    const [obvsText, setObvsText] = useState('')

    //Image data
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
    
        setSelectedImage(imageFile)
    }

    //Server data
    const reqDat = async()=>{
        await axios.get(ApiUrls.requUrl).then(response=>{
            let match = response.data.find(item=>item.id.toString() === id.toString())
            if(match){
                setReqData(match)
            }else{
                setReqData([])
            }
        })
        await axios.get(ApiUrls.requUrl+"?METHOD=DETRE&id="+id).then(response=>{
            setDetData(response.data)
        })
        await axios.get(ApiUrls.cliUrl).then(response=>{
            setCliData(response.data)
        })
        await axios.get(ApiUrls.prodUrl).then(response=>{
            setProData(response.data)
        })
        await axios.get(ApiUrls.varsUrl+'?METHOD=DATA').then(response=>{
            setVarData(response.data)
        })
        await axios.get(ApiUrls.obvsUrl+'?METHOD=OBID&id='+id).then(response=>{
            setObvsData(response.data)
        })
    }

    //Get name by dni
    function getCliName(cli){
        let matchC = cliData.find(item => item.ced === cli)
        if(matchC){
            return matchC.name
        }else{
            return 'Cargando...'
        }
    }

    //Get product name
    function getProdName(pro){
        let matchP = proData.find(item => item.id === pro)
        if(matchP){
            return matchP.name
        }else{
            return 'Cargando...'
        }
    }

    //Get var name
    function getVarName(vard){
        let matchV = varData.find(item => item.id = vard)
        if(matchV){
            return matchV.name
        }else{
            return 'Cargando...'
        }
    }

    //Get color by status
    const getStatusColor=(st)=>{        
        if(st){
            const originalString = st
            return originalString.substring(0, 4).toLowerCase()            
        }else{
            return 'default'
        }
    }

    //Get next status
    const getNextStatus=()=>{
        if(reqData){
            let s = reqData.status
            let r 
            switch (s){
                case 'INGRESADO' :
                    r = 'VERIFICADO'
                    break;
                case 'VERIFICADO' :
                    r = 'AUTORIZADO'
                    break;
                case 'AUTORIZADO' :
                    r = 'FACTURANDO'
                    break;
                case 'FACTURANDO' :
                    r = 'DESPACHANDO'
                    break;
                case 'DESPACHANDO' :
                    r = 'ENTREGADO'
                    break;
                case 'ENTREGADO' :
                    r = 'COMPLETO'
                    break;
                default:
                    r = 'INGRESADO'
                    break;                    
            }
            return r
        }else{
            return 'CARGANDO'
        }
    }

    //Agregar comentario
    const postObvs = async()=>{
        if(userData){
            var f = new FormData()
            f.append("METHOD", "ADD")
            f.append("obvs", obvsText)
            f.append("usid", userData.id)            
            f.append("reid", id)
            if(selectedImage){
                f.append("image", selectedImage)
            }
			await axios.post(ApiUrls.obvsUrl, f, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Important to set the correct content type for FormData
                  },
            }).then(response=>{
                reqDat()
                toast.success('Comentario agregado')
                setSelectedImage(null)
                setObvsText('')
            }).catch(error=>{
                toast.error('Hubo un problema')
			    console.log(error);
			})		
        }
    }

    const postStatus = async()=>{
        if(userData){
            var f = new FormData()
            f.append("METHOD", "UPRE")
            f.append("reid", id)
            f.append("usid", userData.id)
            f.append("status", getNextStatus())
            await axios.post(ApiUrls.requUrl, f).then(response=>{
                reqDat()
                toast.success('Pedido actualizado')
            }).catch(error=>{
                toast.error('Hubo un problema')
			    console.log(error);
            })
        }
    }

    //Verify if the user can do it
    function isPermUser(){
        if(userData){

            let key = false
    
            let pe = userData.perm
            let st = getNextStatus()
    
            switch (pe){
                case 'GG':
                    key = false
                    break;
                case 'GC':
                    key = false
                    break;
                case 'CA':
                    if(st==='FACTURANDO'){
                        key = false
                    }else{
                        key = true
                    }
                    break;
                case 'ED':
                    if(st==='DESPACHANDO'){
                        key=false
                    }else{
                        key=true
                    }
            }
            return key
        }

    }

    useEffect(()=>{
        reqDat()
    },[])
        
  return (
    <Fragment>
			<Breadcrumb title="Pedido"/>
			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>                            
							<CardBody>
                                <Row>
                                    <Col>
                                        <Link to="/requests/list-requests">
                                            <Button color="dark">
                                                Regresar
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>
								<Row>
                                    <div>                                        
                                        <CardBody>
                                            <Row>
                                                <Col>
                                                    <h5>No:</h5> 
                                                    <span className="no-req-txt">
                                                        {reqData?
                                                            String(reqData.id).padStart(5, '0')
                                                            :'Cargando...'                                          
                                                        }
                                                    </span>
                                                </Col>
                                                <Col>
                                                    <h5>Vendedor:</h5>
                                                    <span className="no-req-txt">
                                                        {reqData?
                                                            reqData.saler_na
                                                            :'Cargando...'                                          
                                                        }
                                                    </span>
                                                </Col>
                                            </Row>
                                            <hr/>
                                            <Row>
                                                <Col>
                                                    <span>Cliente:</span>
                                                    <h2 className="mb-0">
                                                        {reqData?
                                                            getCliName(reqData.cli)
                                                            :'Cargando...'                                          
                                                        }
                                                    </h2>
                                                    <h6 className="f-w-600 f-8">											
                                                        <span>
                                                            <i className="fa fa-clock-o"></i>
                                                        </span>
                                                        {reqData?
                                                            reqData.date
                                                            :'Cargando...'                                          
                                                        }
                                                    </h6>
                                                </Col>
                                                <Col>
                                                    <span>Entregar en:</span>
                                                    <h2 className="mb-0">
                                                        {reqData?
                                                            reqData.city
                                                            :'Cargando...'                                          
                                                        }
                                                    </h2>    
                                                    <h6 className="f-w-600 f-8">											
                                                        <span>
                                                            <i className="fa fa-map-marker"></i>
                                                        </span>
                                                        {reqData?
                                                            reqData.dir
                                                            :'Cargando...'                                          
                                                        }
                                                    </h6>                                                    
                                                </Col>
                                            </Row>
                                            <div style={{marginTop: '10px', marginBottom:'10px', display:'flex', flexDirection:'row', alignItems:'center',gap:'1rem'}}>
                                                <span style={{fontWeight: '700'}}>Descripcion: </span>
                                                <span>
                                                    {reqData?
                                                        reqData.descrip
                                                        :'Cargando...'                                          
                                                    }
                                                </span>
                                            </div>
                                            <div className="det-req-warp">
                                                <div className="det-req-overflow">
                                                    <Row className="det-req-titles" lg='8'>
                                                        <Col>
                                                            Producto
                                                        </Col>
                                                        <Col>
                                                            Variacion
                                                        </Col>
                                                        <Col>
                                                            Precio/u
                                                        </Col>
                                                        <Col>
                                                            Cantidad
                                                        </Col>
                                                        <Col>
                                                            Descuento
                                                        </Col>
                                                        <Col>
                                                            Subtotal
                                                        </Col>
                                                        <Col>
                                                            Iva
                                                        </Col>
                                                        <Col>
                                                            Total
                                                        </Col>
                                                    </Row>
                                                    <hr/>
                                                    {detData.map((item,i)=>{
                                                        return(
                                                            <Fragment key={i}>
                                                                
                                                                    <Row>
                                                                        <Col>
                                                                            {getProdName(item.pro)}
                                                                        </Col>
                                                                        <Col>
                                                                            {getVarName(item.var)}
                                                                        </Col>
                                                                        <Col>
                                                                            ${(item.uprice/1.12).toFixed(2)}
                                                                        </Col>
                                                                        <Col>
                                                                            {item.quant}
                                                                        </Col>
                                                                        <Col>
                                                                            {item.disc}%
                                                                        </Col>
                                                                        <Col>
                                                                            ${item.subtotal}
                                                                        </Col>
                                                                        <Col>
                                                                            ${item.iva}
                                                                        </Col>
                                                                        <Col>
                                                                            ${item.total}
                                                                        </Col>
                                                                    </Row>
                                                            </Fragment>
                                                        )
                                                    })}
                                                </div>

                                            </div>
                                            <hr/>
                                            <Row>
                                                <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                    <span>
                                                        <p className="f-w-600 f-16">
                                                        Subtotal
                                                        </p>
                                                    </span>	
                                                </Col>
                                                <Col>
                                                    <hr/>
                                                </Col>
                                                <Col>
                                                    <span>
                                                        <h6 className="f-w-600 f-16">
                                                            $ {
                                                                detData.reduce((acc, obj) => acc + obj.subtotal, 0).toFixed(2)
                                                            }
                                                        </h6>
                                                    </span>	
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                    <span>
                                                        <p className="f-w-600 f-16">
                                                            IVA
                                                        </p>
                                                    </span>	
                                                </Col>
                                                <Col>
                                                    <hr/>
                                                </Col>
                                                <Col>
                                                    <span>
                                                        <h6 className="f-w-600 f-16">
                                                            $ {reqData?
                                                            reqData.iva
                                                            :'Cargando...'                                          
                                                            }
                                                        </h6>
                                                    </span>	
                                                </Col>
                                            </Row>                            
                                            <Row>
                                                <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                    <span>
                                                        <p className="f-w-600 f-16">
                                                        Envio
                                                        </p>
                                                    </span>	
                                                </Col>
                                                <Col>
                                                    <hr/>
                                                </Col>
                                                <Col>
                                                    <span>
                                                        <h6 className="f-w-600 f-16">
                                                            $ {reqData?
                                                            reqData.deliver
                                                            :'Cargando...'                                          
                                                            }
                                                        </h6>
                                                    </span>	
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col style={{display: 'flex', justifyContent: 'end'}}>
                                                    <span>
                                                        <h4 className="f-w-600 f-16">
                                                            Total
                                                        </h4>
                                                    </span>	
                                                </Col>
                                                <Col>
                                                    <hr/>
                                                </Col>
                                                <Col>
                                                    <span>
                                                        <h6 className="f-w-600 f-16">
                                                            $ {reqData?
                                                            reqData.total
                                                            :'Cargando...'                                          
                                                            }
                                                        </h6>
                                                    </span>	
                                                </Col>
                                            </Row>
                                            <hr/>
                                            <Row>
                                            <Card>
                                                {reqData?(
                                                    <div className={'status-box '+getStatusColor(reqData.status)}>	
                                                        <Row xl="3">
                                                            <Col>
                                                                <h4>Estado:</h4>
                                                            </Col>                                                                
                                                            <Col>
                                                                <h3 style={{color:'white'}}>
                                                                {reqData.status}
                                                                </h3>
                                                            </Col>
                                                            <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                                <Button 
                                                                color="dark" 
                                                                disabled={isPermUser()}
                                                                onClick={(e) => {						
                                                                    if (window.confirm("Estas seguro que deseas actualizar?"))
                                                                    postStatus()
                                                                }}
                                                                >{getNextStatus()}</Button>										
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ):(
                                                    <Fragment/>
                                                )
                                            }
                                            </Card> 
                                            </Row>
                                            <hr/>
                                            <Row>
                                                <Col>
                                                    <span><h4>Observaciones</h4></span>
                                                </Col>                                                    
                                            </Row>
                                            {obvsData.length>0?(
                                                obvsData.map((item, i)=>(
                                                    <Fragment key={i}>
                                                        <UserComentary userna={item.usname} date={item.date} text={item.obvs} img={item.imgroute !== ''?item.imgroute:''}/>
                                                    </Fragment>
                                                ))
                                            ):(
                                                <p>No hay comentarios</p>
                                            )}
                                            <Row>
                                                <div className="digital-add needs-validation">
                                                    <FormGroup>                                                            
                                                        <textarea 
                                                            rows="4"
                                                            value={obvsText}
                                                            placeholder="Tu mensaje aqui ..."
                                                            onChange={(e)=>{
                                                                let nv = e.target.value
                                                                setObvsText(nv)
                                                            }}
                                                            maxLength={250}
                                                        />
                                                    </FormGroup>
                                                </div>
                                            </Row>
                                            <Row>
                                                <div className="image-uploader">
                                                    <label className={selectedImage?"custom-file-upload loaded":"custom-file-upload"}>
                                                        <input type="file" accept="image/*" onChange={handleImageChange}/>
                                                        <Image/><span>{selectedImage? 'Imagen lista':'Sube una imagen'}</span>
                                                    </label>
                                                    {selectedImage?(
                                                        <label className='file-deny' onClick={()=>setSelectedImage(null)}>
                                                            <X/>
                                                        </label>
                                                    ):(
                                                        <Fragment/>
                                                    )}
                                                </div>
                                            </Row>
                                            <Row>
                                                <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <Button disabled={selectedImage === null && obvsText === ''} onClick={()=>(postObvs())} color="primary">Agregar Observacion</Button>	
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </div>
                                </Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
  )
}

export default Seerequest