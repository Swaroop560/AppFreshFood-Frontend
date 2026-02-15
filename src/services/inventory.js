const URL = process.env.REACT_APP_API_URL + "api/tinventory/";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export const createTraderInventory = async(supplierOrderObj) => {

    try{
        const createTraderInventoryResponse = await fetch(URL + 'createInventory', options("POST", supplierOrderObj))
        if (createTraderInventoryResponse.ok) {
            const {status,data} = await createTraderInventoryResponse.json();

            if(status)
                return {'status':true,'data':data};
            return {'status':false,'data':[]}
        }
        else{
            return {'status':false,'data':[]}
        }
    }
    catch(error){
        return {'status':false,'message':error.message};
    }
}

   
export const getInventoryByTrader = async(id) => {
    try{
        const  getInventoryByTraderResponse = await fetch(URL + `${id}`, options("GET"))
        if (getInventoryByTraderResponse.ok) {
            const {status,data} = await getInventoryByTraderResponse.json();

            if(status)
             return {'status':true,'data':data};

            return  {'status':false,'data':[]};
        }
        else{
            return {'status':false,'data':[]};
        }
    }
    catch(error){
        return {'status':false,'message':error.message};
    }
}

export const updateInventory = async (id, inventoryData) => {
    try {
      const updateInventoryResponse = await fetch(URL + `${id}`, options("PATCH",inventoryData));
  
      if (updateInventoryResponse.ok) {
        const { status, data } = await updateInventoryResponse.json();
  
        if (status) {
          return { status: true, data };
        }
        return { status: false, data: [] };
      } else {
        return { status: false, data: [] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  export const deleteInventory = async (id) => {
    try {
      const deleteInventoryResponse = await fetch(URL + `${id}`, options("DELETE"));
  
      if (deleteInventoryResponse.ok) {
        const { status, data } = await deleteInventoryResponse.json();
  
        if (status) {
          return { status: true, data };
        }
        return { status: false, data: [] };
      } else {
        return { status: false, data: [] };
      }
    } catch (error) {
      return { status: false, message: error.message };
    }
  };