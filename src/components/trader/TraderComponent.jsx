import React from 'react'
import { Link } from 'react-router-dom'

const TraderComponent = ({dashboardData}) => {

  // const{title,subTitle,link,linkText} = dashboardData;

  return (
    <div className="container">
      <h1 className="my-4">Dashboard</h1>
      <div className="row  d-flex flex-wrap">
        {
          dashboardData && dashboardData.map((item, idx) => <div className="col-md-3 mb-4" key={idx}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">{item.title}</h5>
                <p className="card-text text-center">{item.subTitle}</p>
                <div className="text-center">
                  <Link to={item.link}>
                    <a href="#" className="btn btn-sm btn-primary">{item.linkText}</a>
                  </Link>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    </div>
   
    
       
    //     <div className="col-md-3 mb-4">
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title text-center">Invoices</h5>
    //           <p className="card-text text-center">Manage Invoices</p>
    //           <div className="text-center">
    //             <a href="#" className="btn btn-sm btn-primary">Go to Invoices</a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-3 mb-4">
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title text-center">Payments</h5>
    //           <p className="card-text text-center">Manage Payments</p>
    //           <div className="text-center">
    //             <a href="#" className="btn btn-sm btn-primary">Go to Payments</a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-3 mb-4">
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title text-center">Orders</h5>
    //           <p className="card-text text-center">Manage Orders</p>
    //           <div className="text-center">
    //             <a href="#" className="btn btn-sm btn-primary">Go to Orders</a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-3 mb-4">
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title text-center">Inventory</h5>
    //           <p className="card-text text-center">Manage Inventory</p>
    //           <div className="text-center">
    //             <a href="#" className="btn btn-sm btn-primary">Go to Inventory</a>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="col-md-3 mb-4">
    //       <div className="card">
    //         <div className="card-body">
    //           <h5 className="card-title text-center">Price</h5>
    //           <p className="card-text text-center">Manage Price</p>
    //           <div className="text-center">
    //             <Link to='/tprice'>
    //                 <a href="#" className="btn btn-sm btn-primary">Go to Price</a>
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default TraderComponent