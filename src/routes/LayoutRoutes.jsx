import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../components/app'
import Datatable from '../components/common/datatable'
import Dashboard from '../components/dashboard'

/* Configuraciones */
import Profile from '../components/settings/profile'
import Edituser from '../components/settings/edit-user'


/* Usuarios */
import Createuser from '../components/users/create-user'
import Listuser from '../components/users/list-user'

/* Productos */
import Category from '../components/products/category-list'
import Productlist from '../components/products/product-list'
import ProductStock from '../components/stock/product-stock'

/* Details Products */
import Addcategory from '../components/products/add-category'
import Addproduct from '../components/products/add-product'
import Productdetail from '../components/products/product-detail'

/* Reportes */
import Reports from '../components/reports/report'

/* Pedidos */
import Seerequest from '../components/requests/see-request'
import Createrequest from '../components/requests/create-request'
import Listrequests from '../components/requests/list-requests'

/* Clients */
import Addclient from '../components/clients/create-client'
import Clients from '../components/clients/list-clients'

/* Mensajes */
import Messages from '../components/messages/messages'

const LayoutRoutes = () => {
  return (
    <Fragment>
        <Routes>
            <Route element={<App />}>
            			<Route
							path={`${process.env.PUBLIC_URL}/dashboard`}
							element={<Dashboard />}
						/>

						{/* CLIENTES */}
						<Route
							path={`${process.env.PUBLIC_URL}/clients/create-client/:id?`}
							element={<Addclient />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/clients/list-clients`}
							element={<Clients />}
						/>

						{/* PRODUCTOS */}
						<Route
							path={`${process.env.PUBLIC_URL}/products/category-list`}
							element={<Category />}
						/>						
						<Route
							path={`${process.env.PUBLIC_URL}/products/product-list`}
							element={<Productlist />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/stock/product-stock`}
							element={<ProductStock />}
						/>

						{/* DETALLES DE PRODUCTOS */}
						<Route
							path={`${process.env.PUBLIC_URL}/products/add-category`}
							element={<Addcategory />}
						/>						
						<Route
							path={`${process.env.PUBLIC_URL}/products/add-product/:id?`}
							element={<Addproduct />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/products/product-detail/:id`}
							element={<Productdetail />}
						/>
						
						{/* PEDIDOS */}
						<Route
							path={`${process.env.PUBLIC_URL}/requests/list-requests`}
							element={<Listrequests />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/requests/create-request`}
							element={<Createrequest />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/requests/see-request`}
							element={<Seerequest />}
						/>																		

						<Route
							path={`${process.env.PUBLIC_URL}/users/list-user`}
							element={<Listuser />}
						/>
						<Route
							path={`${process.env.PUBLIC_URL}/users/create-user`}
							element={<Createuser />}
						/>		

						<Route
							path={`${process.env.PUBLIC_URL}/reports/report`}
							element={<Reports />}
						/>

						<Route
							path={`${process.env.PUBLIC_URL}/messages/messages`}
							element={<Messages />}
						/>

						<Route 
							path={`${process.env.PUBLIC_URL}/settings/profile`}
							element={<Profile />}
						/>
						<Route 
							path={`${process.env.PUBLIC_URL}/settings/edit-user`}
							element={<Edituser />}
						/>
		
						<Route
							path={`${process.env.PUBLIC_URL}/data-table`}
							element={<Datatable />}
						/>
                </Route>
        </Routes>
    </Fragment>
    )
}

export default LayoutRoutes