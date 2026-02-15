import React from 'react'
import './PaymentsComponent.css'

const PaymentsComponent = ({orders,editPayment}) => {
  return (
    <div>
        <table className="table table-dark table-striped table-bordered">
            <thead>
                <tr>
                    <td>S.No</td>
                    <td>OrderID</td>
                    <td>UserID</td>
                    <td>Status</td>
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Due</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    orders.length > 0 ?
                    orders && orders.filter(order => order.orderAccepted === true).map((order,idx) =><tr>
                        <td>{idx + 1}</td>
                        <td>{order._id}</td>
                        <td>{order.userID}</td>
                        <td>{order.orderAccepted ? <span className='text-success'>Accepted</span> : <span className='text-danger'>Pending</span>}</td>
                        <td>{order.grandTotal}</td>
                        <td>{order.amountPaid}</td>
                        <td>{order.grandTotal - order.amountPaid}</td>
                        <td>
                            <i className="fa-solid fa-pen" onClick={() =>editPayment(order._id,order)}></i>
                        </td>
                    </tr>)
                    : 
                    <tr>
                        <td colSpan={8} className="text-center"> <i>No Accepted Orders</i></td>
                    </tr>
                }
            </tbody>
        </table>
        
    </div>
  )
}

export default PaymentsComponent