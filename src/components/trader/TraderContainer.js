import React from 'react'
import { useAuth } from '../../context/Auth'
import { traderDashboardObj } from '../configs/traderDashboard'
import { supplierDashboardObj } from '../configs/supplierDashboard'
import TraderComponent from './TraderComponent'

const TraderContainer = () => {
  const{code} = useAuth();

  const user_code = code.substring(0,4);
  const dashboardData = user_code === 'TRAD' ? traderDashboardObj : supplierDashboardObj;
  return (
   <TraderComponent dashboardData={dashboardData} />
  )
}

export default TraderContainer



/*

1. Products
2. Inventory
3. Orders
4. Payments
5. Invoices

*/