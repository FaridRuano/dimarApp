import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb";
import Slider from "react-slick";
import "../../assets/scss/slick.scss";
import "../../assets/scss/slick-theme.scss";

import {Rating} from "react-simple-star-rating";

// image import
import two from "../../assets/images/pro3/2.jpg";
import twentySeven from "../../assets/images/pro3/27.jpg";
import one from "../../assets/images/pro3/1.jpg";
import size_chart from "../../assets/images/size-chart.jpg";
import {
	Button,
	Card,
	Col,
	Container,
	Row,
	Modal,
	ModalHeader,
} from "reactstrap";

const Product_detail = () => {
	const [open, setOpen] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [rating, setRating] = useState(1);
	const [nav, setNav] = useState({
		nav1: null,
		nav2: null,
	});
	const onOpenModal = () => {
		setOpen(true);
	};

	const onCloseModal = () => {
		setOpen(false);
	};
	const onStarClick = (nextValue) => {
		setRating(nextValue);
	};

	const IncrementItem = () => {
		if (quantity < 9) {
			setQuantity(quantity + 1);
		} else {
			return null;
		}
	};
	const DecreaseItem = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		} else {
			return null;
		}
	};
	const handleChange = (event) => {
		setQuantity(parseInt(event.target.value));
	};

	useEffect(() => {
		setNav({
			nav1: Slider.slider1,
			nav2: Slider.slider2,
		});
	}, []);

	return (
		<Fragment>
			<Breadcrumb title="Detalles del Producto"/>

			<Container fluid={true}>
				<Card>
					<Row className="product-page-main card-body">
						<Col xl="4">
							<Slider
								asNavFor={nav.nav2}
								ref={(slider) => (Slider.slider1 = slider)}
								className="product-slider"
							>
								<div className="item">
									<img className="img-fluid" src={one} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={twentySeven} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={two} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={one} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={twentySeven} alt="" />
								</div>
							</Slider>

							<Slider
								asNavFor={nav.nav1}
								ref={(slider) => (Slider.slider2 = slider)}
								slidesToShow={4}
								swipeToSlide={true}
								focusOnSelect={true}
								className="small-slick"
							>
								<div className="item">
									<img className="img-fluid" src={one} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={twentySeven} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={two} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={twentySeven} alt="" />
								</div>
								<div className="item">
									<img className="img-fluid" src={one} alt="" />
								</div>
							</Slider>
						</Col>
						<Col xl="8">
							<div className="product-page-details product-right mb-0">
								<h2>Forro Sarin</h2>								
								<hr />
								<Row>
									<Col>
										<h6 className="product-title">Categoria:</h6>
									</Col>
									<Col>
										<p className="pull-left">
											Textiles
										</p>
									</Col>
								</Row>
								<hr />
								<h6 className="product-title">Descripcion:</h6>
								<p>
									Forro tendencia 2023 para comercio internacional.
								</p>
								<hr/>			
								<h6 className="product-title">Precios:</h6>
								<Row>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> 6.00</h4>
										<p className="pull-left">
											Contado
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> 5.20</h4>
										<p className="pull-left">
											Credito
										</p>
									</Col>
									<Col>
										<h4 className="product-title"><i className="fa fa-dollar"/> 4.18</h4>
										<p className="pull-left">
											Distribuidor
										</p>
									</Col>
								</Row>								
								<hr />
								<h6 className="product-title">Colores:</h6>
								<ul className="color-variant">
									<li className="bg-light0"></li>
									<li className="bg-light1"></li>
									<li className="bg-light2"></li>
								</ul>
								<hr/>
								<Row>
									<Col>
										<h6 className="product-title">Unidad:</h6>
									</Col>
									<Col>
										<p className="pull-left">
											Metros
										</p>
									</Col>
								</Row>
								<hr />		
								<Row>
									<Col>
										<h6 className="product-title">Disponible:</h6>
									</Col>
									<Col style={{backgroundColor:'green', padding:'7px', borderRadius:'25px',display:'flex', cursor:'pointer'}}>
										<div >
											<p className="pull-left" style={{color:'white', paddingLeft:'5px', paddingTop:'2px'}}>											
												<h4> <i className="fa fa-circle"/> Si</h4>
											</p>
										</div>										
									</Col>
								</Row>
								<hr/>																														
								<div className="m-t-15">
									<Button color="primary" className="m-r-10" type="button">
										Editar
									</Button>									
								</div>
							</div>
						</Col>
					</Row>
				</Card>
			</Container>
		</Fragment>
	);
};

export default Product_detail;
