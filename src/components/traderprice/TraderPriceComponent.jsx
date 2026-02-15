import React from 'react'
import { Link } from 'react-router-dom'
import './TraderPriceComponent.css'
import EditTable from '../editabletable'

const TraderPriceComponent = ({data,columns}) => {

  console.log('data in trader price',data)
  return (
    <div className="container my-2">
        <h3 className='text-center'>Trader Price Chart</h3>
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

export default TraderPriceComponent