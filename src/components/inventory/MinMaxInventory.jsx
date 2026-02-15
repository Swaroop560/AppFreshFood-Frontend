import React from 'react'
import EditTable from '../editabletable'

const MinMaxInventory = ({data,columns}) => {
  return (
    <div className="row mx-auto">
    <div className="col-md-12">
        <EditTable data={data} columns={columns} />
    </div>
  </div>
  )
}

export default MinMaxInventory