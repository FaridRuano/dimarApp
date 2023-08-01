import {
    Home,
    Box,
    DollarSign,
    Clipboard,
    UserPlus,
    BarChart,
    Settings,
    Users,
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Inicio', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Clientes',path:'/clients/list-clients', icon: Users, type: 'link', active: false
    },    
    {
        title: 'Productos', icon: Box, type: 'sub', active: false, children: [
            { path: '/products/category-list', title: 'Categorias', type: 'link' },            
            { path: '/products/product-list', title: 'Productos', type: 'link' },
            { path: '/stock/product-stock', title: 'Stock', type: 'link' },                        
        ]
    },    
    {
        title: 'Pedidos', icon: Clipboard , type: 'sub', active: false, children: [
            { path: '/requests/list-requests', title: 'Lista de Pedidos', type: 'link' },
            { path: '/requests/create-request', title: 'Nuevo Pedido', type: 'link' },

        ]
    },     
    {
        title: 'Usuarios', path: '/users/list-user', icon: UserPlus, type: 'link', active: false
    },  
    {
        title: 'Reportes',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
      
]
