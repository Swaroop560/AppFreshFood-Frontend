import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import "./OrderComponent.css"

const OrdersComponent = ({ orders,status,orderUpdate, updateOrderToBackend ,handleOrderUpdateChange1,handleGenerateInvoice}) => {

    // const [orderUpdate, setOrderUpdate] = useState({});
    const [isEditing, setIsEditing] = useState([]);

    const imgPath = '../assets/product-images/';

    const role = localStorage.getItem('userRole');

   

    const handleToggleOrderUpdate = (orderIndex, itemIndex) => {
        setIsEditing(prevState => {
            const updatedState = [...prevState];
            if (!updatedState[orderIndex]) updatedState[orderIndex] = [];
            updatedState[orderIndex][itemIndex] = !updatedState[orderIndex]?.[itemIndex]; // Toggle editing status
            return updatedState;
        });
    }

    return (
        <div className="accordion my-3" id="accordionExample">
            {
                orders.length > 0 ?
                    orders && orders.filter(o => o.orderAccepted === status).map((order, orderIndex) =>
                        <div className="accordion-item" key={orderIndex}>
                            <h6 className="accordion-header" id={`heading-${orderIndex}`}>
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${orderIndex}`} aria-expanded="true" aria-controls={`collapse-${orderIndex}`}>
                                    <p>
                                        OrderID-
                                        <i className="text-danger">{order._id}</i> <span>{role === 'Supplier' ? order.orderAccepted ? <i className="border border-success border-3 rounded card-title-info">Accepted</i> : <i className="border border-danger border-3 rounded card-title-info">Pending</i> : ''}</span>
                                    </p>
                                    <p className='cardText mx-2 p-1 rounded text-center text-warning bg-dark'>
                                        {order.deliveryDate}
                                    </p>
                                    <p className='cardText mx-2 p-1 rounded text-center text-warning bg-dark'>
                                        {role === 'Supplier' ? order.traderCode : ''}
                                    </p>
                                </button>
                            </h6>
                            <div id={`collapse-${orderIndex}`} className="accordion-collapse collapse show" aria-labelledby={`heading-${orderIndex}`} data-bs-parent="#accordionExample">
                                <p>{order.productName}</p>
                                <div className="accordion-body">
                                    {
                                        order.orderItems.length > 0 && order.orderItems.map((ordItem, itemIndex) => {
                                            return (
                                                <div className="row border-bottom" key={itemIndex}>
                                                    <div className="col text-center my-auto">
                                                        <img src={`${imgPath + ordItem.image}`} alt={ordItem.productName} className="card-img " />
                                                        <p className="card-title text-center cardText">{ordItem.productName}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        {isEditing[orderIndex] && isEditing[orderIndex][itemIndex] ? (
                                                            <form>
                                                                <label className='card-text cardText'>Qty</label>
                                                                <input
                                                                    type="number"
                                                                    name="qty"
                                                                    id="qty"
                                                                    className="text-center"
                                                                    onChange={(e) => handleOrderUpdateChange1(e, orderIndex, itemIndex, ordItem.unitPrice)}
                                                                    // value={orderUpdate[orderIndex]?.orderItems[itemIndex]?.qty || ordItem.qty}
                                                                    // defaultValue={orderUpdate[orderIndex]?.orderItems[itemIndex]?.qty || ordItem.qty}
                                                                    value={orderUpdate[orderIndex]?.[itemIndex]?.qty || ordItem.qty} 
                                                                    /><br />
                                                                    {/* defaultValue={orderUpdate[orderIndex]?.orderItems[itemIndex]?.qty || ordItem.qty} */}
                                                                <label className='card-text cardText'>Type</label>
                                                                <select
                                                                    id="type"
                                                                    name="type"
                                                                    className="text-center"
                                                                    onChange={(e) => handleOrderUpdateChange1(e, orderIndex, itemIndex, ordItem.unitPrice)}
                                                                    value={orderUpdate[orderIndex]?.[itemIndex]?.type || ordItem.type} >
                                                                    <option value="-1">Select</option>
                                                                    <option value={orderUpdate.type === "" ? ordItem.type : orderUpdate.type }>{ordItem.type}</option>
                                                                  
                                                                </select>
                                                            </form>
                                                        ) : (
                                                            <div className="text-center">
                                                                <span className='card-text cardText'>Qty - {orderUpdate[orderIndex]?.[itemIndex]?.qty || ordItem.qty}</span><br />
                                                                <span className='card-text cardText'>Type - {orderUpdate[orderIndex]?.[itemIndex]?.type || ordItem.type}</span>
                                                            </div>
                                                        )}
                                                        <p className="card-text text-warning text-center cardText"><i>price :-</i> ${ordItem.unitPrice}</p>
                                                        <p className="card-text text-danger text-center cardText"> <i>total :-</i>${orderUpdate[orderIndex]?.[itemIndex]?.subtotal || ordItem.subTotal}</p>
                                                    </div>
                                                    <div className="col">
                                                        {isEditing[orderIndex] && isEditing[orderIndex][itemIndex] ? (
                                                            <>
                                                                <button className="btn btn-sm btn-secondary m-2" onClick={() => updateOrderToBackend(orderIndex, itemIndex, ordItem.unitPrice,order._id,ordItem.type)}>Update Order</button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => handleToggleOrderUpdate(orderIndex, itemIndex)}>Cancel</button>
                                                            </>
                                                        ) : (
                                                               !status?  <button className="btn btn-sm btn-primary my-2" onClick={() => handleToggleOrderUpdate(orderIndex, itemIndex)}>Edit Order</button> : ''
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                    <div className='text-center my-3'>
                                        {
                                          role !== 'Supplier' ?  !status && <button className="btn btn-sm btn-success" onClick={() => handleGenerateInvoice(order._id,order)}>Generate Invoice</button> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    :
                    <div className='text-center lead my-3'>
                        No Orders Currently to Display
                    </div>
            }
        </div>
    )
}

export default OrdersComponent;
