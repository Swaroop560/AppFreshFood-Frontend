import React from 'react'
import { weekDays } from '../configs/data'

const AvailabilityComponent = ({availability,handleInfoChange,addProductInfo}) => {

    console.log('addProductsData',addProductInfo)
    //addProductInfo.traders[0]?.[`${type}`]?.qty
    const renderFields = (value) => {
        
        switch(value){
            case "week": 
            return (
                <div className="text-center m-2">
                    {
                        weekDays.map((item,idx) =><>
                            <input
                                type="checkbox"
                                className="form-check-input mx-1"
                                id={item}
                                name={item}
                                key={idx} //addProductsData.info.availability.weekly.includes(`${item}`)
                                value={item}
                                checked={addProductInfo.traders[0].weekly?.includes(`${item}`)}
                                onChange={handleInfoChange}
                            />
                            <label className="form-check-label" htmlFor={item}>{item}</label>
                        </>)
                    }
                   
                </div>
            )
            case "season": return (
                <div>
                    <label htmlFor="start-date">Start</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        name="start-date" 
                        id="start-date" 
                        min={new Date().toLocaleDateString('fr-CA')}
                        value={addProductInfo.traders[0]?.seasonal.startDate}
                        onChange={handleInfoChange} />

                    <label htmlFor="end-date">End</label>
                    <input 
                        type="date" 
                        className="form-control" 
                        name="end-date" 
                        id="end-date" 
                        min={new Date().toLocaleDateString('fr-CA')}
                        value={addProductInfo.traders[0]?.seasonal.endDate}
                        onChange={handleInfoChange}  />
                </div>
            )
            // case "yearly" : 
            //     return (
            //         <div>
            //              <input
            //                     type="checkbox"
            //                     className="form-check-input mx-1"
            //                     id="yearly"
            //                     name="yearly" //addProductsData.info.availability.weekly.includes(`${item}`)
            //                     // value={}
            //                     checked={addProductInfo.traders[0].yearly ? addProductInfo.traders[0].yearly : false }
            //                     onChange={handleInfoChange}
            //             />
            //              <label className="form-check-label" htmlFor="yearly">Yearly</label>
            //         </div>
            //     )
            //     break;
            default:
             return;
        }
    }
  return (
    <div>
       {
        renderFields(availability)
       }
    </div>
  )
}

export default AvailabilityComponent