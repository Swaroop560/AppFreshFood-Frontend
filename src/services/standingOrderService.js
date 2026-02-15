const URL = process.env.REACT_APP_API_URL + "api/standingOrders/";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export const createStandingOrder = async(standingOrderObj) => {

    try{
        const createStandingOrderResponse = await fetch(URL + 'createOrder', options("POST", standingOrderObj))
        if (createStandingOrderResponse.ok) {
            const {status,data} = await createStandingOrderResponse.json();

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

export const getStandingOrders = async(id) => {
    try{
        const getStandingOrdersResponse = await fetch(URL + `${id}`, options("GET"))
        if (getStandingOrdersResponse.ok) {
            const {status,data} = await getStandingOrdersResponse.json();

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
export const deleteStandingOrders = async(id) => {
    try{
        const deleteStandingOrdersResponse = await fetch(URL + `${id}`, options("DELETE"))
        if (deleteStandingOrdersResponse.ok) {
            const {status,data} = await deleteStandingOrdersResponse.json();

            if(status)
             return {'status':true,'data':[]};

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