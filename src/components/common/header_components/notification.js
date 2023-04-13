import React, { Fragment } from "react";
import { ShoppingBag, AlertCircle, PlusSquare } from "react-feather";
import { Media } from "reactstrap";

const Notification = () => {
	return (
		<Fragment>
			<ul className="notification-dropdown onhover-show-div p-0">
				<li>
					Notificaciones{" "}
					<span className="badge rounded-pill badge-primary pull-right">3</span>
				</li>
				<li>
					<Media>
						<Media body>
							<h6 className="mt-0">
								<span>
									<ShoppingBag />
								</span>
								Pedido listo para ser enviado
							</h6>
							<p className="mb-0">Haz click para revisar el pedido.</p>
						</Media>
					</Media>
				</li>
				<li>
					<Media>
						<Media body>
							<h6 className="mt-0 txt-success">
								<span>
									<PlusSquare />
								</span>
								Nuevo pedido esperando
							</h6>
							<p className="mb-0">Un nuevo pedido ha sido registrado por Edwin Manzillas.</p>
						</Media>
					</Media>
				</li>
				<li>
					<Media>
						<Media body>
							<h6 className="mt-0 txt-danger">
								<span>
									<AlertCircle />
								</span>
								Pedido atrasado
							</h6>
							<p className="mb-0">Haz click para revisar el pedido.</p>
						</Media>
					</Media>
				</li>
				<li className="txt-dark">
					<a href="#javaScript">Ver todas las notificaciones</a>
				</li>
			</ul>
		</Fragment>
	);
};

export default Notification;
