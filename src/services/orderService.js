const URL = process.env.REACT_APP_API_URL + "api/supplierorders/";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export const createSupplierOrder = async(supplierOrderObj) => {

    try{
        const createSupplierOrderResponse = await fetch(URL + '/createOrder', options("POST", supplierOrderObj))
        if (createSupplierOrderResponse.ok) {
            const {status,data} = await createSupplierOrderResponse.json();

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

export const getOrders = async(id) => {
    try{
        const getOrdersResponse = await fetch(URL + `${id}`, options("GET"))
        if (getOrdersResponse.ok) {
            const {status,data} = await getOrdersResponse.json();

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

export const acceptOrder = async(id,status) => {
    try{
        const updateOrderItemResponse = await fetch(URL + `${id}`, options("PATCH",status))
        if (updateOrderItemResponse.ok) {
            const {status,data} = await updateOrderItemResponse.json();

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
export const updateOrderItem = async(id,orderItem) => {
    try{
        const updateOrderItemResponse = await fetch(URL + `${id}`, options("PATCH",orderItem))
        if (updateOrderItemResponse.ok) {
            const {status,data} = await updateOrderItemResponse.json();

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

export const getTraderOrders = async(code) => {
    try{
        const getOrdersResponse = await fetch(URL+'trader/' + `${code}`, options("GET"))
        if (getOrdersResponse.ok) {
            const {status,data} = await getOrdersResponse.json();

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