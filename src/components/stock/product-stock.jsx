import React, { Fragment, useState, useEffect, useContext } from "react";
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb";
import axios from 'axios'
import { toast } from "react-toastify";
import { Autocomplete } from "@mui/joy";
import { NumericFormat } from "react-number-format";
import './style.scss'
import DataTable from "react-data-table-component";
import SwitchButton from "../common/utils/switch/switch-btn";
import { Layers, Shuffle } from "react-feather";
import ApiUrls from "../../constants/api-urls";
import { UserContext } from "../../constants/user-data";

const Stock = () => {
	const proUrl = ApiUrls.prodUrl
	const varsUrl = ApiUrls.varsUrl
  const stoUrl = ApiUrls.stocUrl

  const { userData } = useContext(UserContext)

  const [id, setId] = useState()
  const [unit, setUnit] = useState()
  const [proData, setProData] = useState([])
  const [varsData, setVarsData] = useState([])
  const [product, setProduct] = useState('')
  const [selected, setSelected] = useState('')
  const [valStock, setValStock] = useState('')
  const [isAdd, setIsAdd] = useState(true)
  const [auditList, setAuditList] = useState([])
  const [descr, setDescr] = useState([])

  const getData = async()=>{
    await axios.get(proUrl+"?METHOD=DATA").then(response=>{
			setProData(response.data)							
		})	
    await axios.get(varsUrl+"?METHOD=DATA").then(response=>{
			setVarsData(response.data)							
		})
  }

	const op_pro_name = proData.map(item => item.name)	

  function loadProdVars(){	
		let op_pro_var = []
		if(id !== ''){
			op_pro_var = varsData
    		.filter(product => product.prod === id)
		}
		return op_pro_var			
	}

  function loadVar(id){
    const match = varsData.find(obj => obj.id === id)
    if(match){
      setSelected(match)
      getAudStock(match.id)
    }else{
      setSelected('')
    }
  }

  const handleSwitchChange = (newValue) => {
    setIsAdd(newValue);
  };

  const getAudStock = async(id_v_a)=>{    
    await axios.get(`${stoUrl}?METHOD=AUDIT&id=${id_v_a}`).then(response=>{
      setAuditList(response.data)
    })
  }

  const col=[		
		{
			name: 'OPE',
			selector: row => row.action,
			center: true,
			width: '110px',
		},
		{
			name: 'Usuario',
			selector: row => row.us,
			width: '170px',
		},
		{
			name: 'Fecha',
			selector: row => row.date,
			wrap:true,
		},
    {
			name: <Shuffle/>,
			selector: row => row.value,
			wrap:true,
      center:true,
      cell:((row)=>(
        row.action=='ADICION'?
        row.value : -row.value

      )
      )
		},
    {
			name: <Layers/>,
			selector: row => row.a_stock,
			wrap:true,
      center: true,
		},
	]

  const customStyles = {
		rows: {
			style: {
				minHeight: '52px',
			},
		},
		headCells: {
			style: {
				padding: '10px',
				fontSize: '0.9rem',
				fontWeight: 'bold',
				background: 'rgba(236, 240, 241 ,0.4)', 
			},
		},
		cells: {
			style: {
				padding: '15px',	
			},
		},
	}

  const ExpandedComponent = ({ data }) => (
		<div style={{margin: '10px', marginLeft:'50px',padding: '1opx'}}>
      <span>
        <h2 style={{fontSize: '12px'}}>Observacion:</h2>
        {data.descr != ''? 
        (
          <p>{JSON.stringify(data.descr, null, 2)}</p>
        ) : (
          <p>Sin observaciones</p>
        )}
      </span>
    </div>		
	)

  const postStock = async() => {
    if(valStock>0){
			var f = new FormData()
			f.append("METHOD", 'AUDIT')
			f.append("id", selected.id)
			if(isAdd){
        f.append("action", "ADICION")
      }else{
        f.append("action", "SALIDA")
      }
      f.append("value", valStock)
      f.append("userid", userData.id)
      f.append("stock", selected.stock)
      f.append("descr", descr)
			await axios.post(stoUrl, f).then(
				response=>{
					setValStock('')
          setDescr('')
					toast.success("Agregado Exitosamente!")			
				}
			).catch(error=>{
				console.log(error)
			})			
			getAudStock(selected.id)
      getData()
      isAdd ? ( selected.stock=parseFloat(selected.stock)+parseFloat(valStock) )
       : ( selected.stock=parseFloat(selected.stock)-parseFloat(valStock) )
      
		}else{
      toast.warn("Valor no valido")
    }
  }

  useEffect(() => {
		getData()
	}, [])

	return (
		<Fragment>
			<Breadcrumb title="Stock"/>
			<Container fluid={true}>
        <Card>
          <CardHeader>
            <h5>Productos disponibles</h5>
          </CardHeader>
          <CardBody>
            <Row>
              <h4 className="title-var">Selecciona un producto</h4>
            </Row>
            <Row>
              <Autocomplete
                value={product || ''}
                onChange={(event, newValue) => {
                  setProduct(newValue)
                  const matchingProd = proData.find(obj => obj.name === newValue)
                  if(matchingProd){
                    setId(matchingProd.id)
                    setUnit(matchingProd.unit)
                  }else{
                    setId('')
                    setUnit('')
                  }
                  setSelected('')                
                }}
                options={op_pro_name}
                sx={{ borderRadius:"3px" }}	
                noOptionsText="No coincide ninguno"
                isOptionEqualToValue={(option, value) => option.id === value.id}
                placeholder="Producto"
                
              />
            </Row>            
            <hr/>
            <Row>
                <h4 className="title-var">Variantes disponibles</h4>
            </Row>
            <Row>
                <Col>
                  <span className="bold-text">Nombre</span>
                </Col>
                <Col>
                  <span className="bold-text">Stock</span>
                </Col>
                <Col>
                  <span className="bold-text">Seleccionar</span>              
                </Col>
            </Row>
            {id ? (
              loadProdVars().map((v, i) =>{
                return(
              <Fragment key={i}>
                <Row className="row-vars">
                  <Col>
                    {v.name}
                  </Col>
                  <Col>
                    <span>
                      {v.stock} <span className="low-text">{unit}</span>
                    </span>                    
                  </Col>
                  <Col>
                    <button className="fbtn select-btn" type="button" onClick={()=>loadVar(v.id)}><i className="fa fa-hand-o-up"/></button>
                  </Col>
                </Row>

              </Fragment>
              )
            })) : (<p>Ningun producto ha sido seleccionado</p>)}
          </CardBody>
        </Card>        
        {selected !== '' ? (
          <Fragment>
          <Card>
            <CardHeader>
              <Row>
                <Col>
                  <h4>Modificar stock</h4>
                </Col>
                <Col className="left">
                  <SwitchButton value={isAdd} onChange={handleSwitchChange}/>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Row className="row-vars">
                <Col>
                  <span className="bold-text">Nombre</span>
                </Col>
                <Col>
                  <span className="bold-text non-wrap">S. Actual</span>
                </Col>
                <Col>
                  <span className="bold-text">Valor</span>
                </Col>                
              </Row>
              <Row className="row-vars">
                <Col>
                  {selected.name}
                </Col>
                <Col>
                  
                  {valStock !== '' ? <Fragment>{selected.stock} {isAdd ? '+' : '-'} {valStock}</Fragment> : <Fragment>{selected.stock}</Fragment>}
                  <span className="low-text"> {unit}</span>
                </Col>
                <Col>
                  <NumericFormat
                    value={valStock}
                    onChange={(e)=>{                    
                      if(e.target.value != 0){
                        setValStock(e.target.value)
                      }else{
                        setValStock('')
                      }
                    }}
                    customInput={Input}
                    allowNegative={false}
                    allowLeadingZeros={false}
                    decimalScale={2}
                    placeholder="Cantidad"
                  />
                </Col>                
              </Row>
              <hr/>
              <Row>
                <FormGroup>
                  <Label>Observacion</Label>
                  <Input 
                    type="text"
                    value={descr || ''}
                    onChange={(e)=>(setDescr(e.target.value))}
                    maxLength={200}
                  />
                </FormGroup>
              </Row>
              <Row md='4' sm="4" xs="1">
                  <button type='button' className="fbtn acept-btn" onClick={()=>postStock()}>Aceptar</button>
              </Row>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>              
              <h4>Cambios en el stock</h4>
            </CardHeader>           
            <CardBody>
              <DataTable
                columns={col}
                data={auditList}
                multiSelectOption={false}
                pageSize={10}
                pagination={true}
                customStyles={customStyles}
                noDataComponent="No hay datos para mostrar" 
								expandableRows
								expandableRowsComponent={ExpandedComponent}

              />
            </CardBody> 
          </Card>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
			</Container>
		</Fragment>
	);
};

export default Stock;
