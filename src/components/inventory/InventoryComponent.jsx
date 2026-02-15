import React from 'react'
import { Link } from 'react-router-dom'
import EditTable from '../editabletable'

const InventoryComponent = ({data,columns}) => {
  return (
    <div className="container my-2">
        <h3 className='text-center'>Trader Inventory Chart</h3>
          <div>
              <Link to='/trader'>
                  Trader DashBoard
              </Link>
          </div>
          <div className="row">
            <div className="col-md-12">
                <EditTable data={data} columns={columns} />
            </div>
          </div>
    </div>
  )
}

export default InventoryComponent;