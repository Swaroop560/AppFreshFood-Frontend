import React,{useEffect,useState} from 'react'
import './EditTableComponent.css'

const EditTableComponent = ({data,columns,handleUpdateInventory}) => {

    console.log('data',data)
   
    const [editableData, setEditableData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [originalData, setOriginalData] = useState([]);

    useEffect(() =>{
      console.log('useeffect-data',data)
      setEditableData([...data]);
      setOriginalData([...data]);
    },[data])

    const handleEdit = (rowIndex, colIndex, value) => {

      // const dataObj = [...data]
      // const newData = [...editableData];
      // newData[rowIndex].traders[0][columns[colIndex].mode][columns[colIndex].accessor[columns[colIndex].index]] = parseInt(value);
      const newData = editableData.map((row, index) => {
        console.log('rows', row)
        if (index === rowIndex) {
          row.traders[0][columns[colIndex].mode][columns[colIndex].accessor[columns[colIndex].index]] = parseInt(value);
          return row;
        }
        return row;
      });
      setEditableData(newData);
    };
    const handleEditRow = (rowIndex) => {
      setEditingRow(rowIndex);
    };
    const handleClose = () =>{
      setEditableData(data);  
      setEditingRow(null)
    }
    const handleUpdate = (id,row) => {
        setEditingRow(null)
        handleUpdateInventory(id,row)
    }
  
    return (
      <table className="table table-bordered my-3">
        <thead>
          <tr>
            {columns.map((column, colIndex) => (
              <th key={colIndex}>{column.header}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { editableData && editableData.map((row, rowIndex) => (
            //row.traders.filter(row => row.traderCode === code)
            console.log('Row',row),
            console.log('RowINdex',rowIndex),
            <tr key={rowIndex}>
              {columns.map((column, colIndex) =>
                <td key={colIndex} className="w-30">
                  {editingRow === rowIndex && colIndex > 0 ? (
                    <input
                      type="number" 
                      className="text-center w-25"
                      // name = {row.traders[0][column.mode][column.accessor[1]]}
                      min={0}
                      value={ row.traders[0][column.mode][column.accessor[column.index]]}
                      onChange={(e) => handleEdit(rowIndex, colIndex, e.target.value)}
                    />
                  ) : (
                    <span className="text-center">
                      { column.mode === 'item' ? row.productName : row?.traders[0][column.mode][column.accessor[column.index]] }
                    </span>
                )}
                </td>
              )}
              <td>
                {editingRow === rowIndex ? (
                    <>
                     <i className="fa-solid fa-check mx-2" style={{cursor:'pointer',fontSize:'17px'}} onClick={() => handleUpdate(row._id,row)}></i>
                     <i className="fa-solid fa-x" style={{cursor:'pointer',fontSize:'17px'}} onClick={() => handleClose()}></i>
                  </>
                ) : (
                  <i className="fa-solid fa-pen" style={{cursor:'pointer',fontSize:'17px'}} onClick={() => handleEditRow(rowIndex)}></i>
                )}
              </td>
            </tr>)
          )}
        </tbody>
      </table>
    );
}

export default EditTableComponent