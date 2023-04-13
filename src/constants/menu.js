import {
    Home,
    Box,
    DollarSign,
    Clipboard,
    UserPlus,
    BarChart,
    Settings,
    LogOut,
    Users,
    Mail
} from 'react-feather';

export const MENUITEMS = [
    {
        path: '/dashboard', title: 'Inicio', icon: Home, type: 'link', badgeType: 'primary', active: false
    },
    {
        title: 'Clientes', icon: Users , type: 'sub', active: false, children: [
            { path: '/clients/list-clients', title: 'Lista de Clientes', type: 'link' },
            { path: '/clients/create-client', title: 'Crear Cliente', type: 'link' },
            { path: '/clients/list-deu', title: 'Lista de Deudas', type: 'link' },
            { path: '/clients/create-pay', title: 'Agregar Abono', type: 'link' },
        ]
    }, 
    {
        title: 'Productos', icon: Box, type: 'sub', active: false, children: [
            { path: '/products/category-list', title: 'Lista de Categorias', type: 'link' },            
            { path: '/products/add-category', title: 'Agregar Categoria', type: 'link' },                                
            { path: '/products/product-list', title: 'Lista de Productos', type: 'link' },
            { path: '/products/add-product', title: 'Agregar Producto', type: 'link' },            
        ]
    },    
    {
        title: 'Ventas', icon: DollarSign, type: 'sub', active: false, children: [
            { path: '/sales/orders', title: 'Ventas', type: 'link' },
            { path: '/sales/add-sale', title: 'Nueva Venta', type: 'link' },
            { path: '/sales/transactions', title: 'Transacciones', type: 'link' },
            { path: '/sales/add-transaction', title: 'Nueva Transaccion', type: 'link' },
        ]
    },    
    {
        title: 'Pedidos', icon: Clipboard , type: 'sub', active: false, children: [
            { path: '/requests/list-requests', title: 'Lista de Pedidos', type: 'link' },
            { path: '/requests/create-request', title: 'Nuevo Pedido', type: 'link' },

        ]
    },     
    {
        title: 'Usuarios', icon: UserPlus, type: 'sub', active: false, children: [
            { path: '/users/list-user', title: 'Lista de Usuarios', type: 'link' },
            { path: '/users/create-user', title: 'Agregar Usuario', type: 'link' },
        ]
    },  
    {
        title: 'Reportes',path:'/reports/report', icon: BarChart, type: 'link', active: false
    },
    {
        title: 'Configuraciones',path: '/settings/profile', icon: Settings, type: 'link', active: false
    },    
    {
        title: 'Cerrar Sesion',path:'/auth/login', icon: LogOut, type: 'link', active: false
    }
]
