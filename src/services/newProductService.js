const URL = process.env.REACT_APP_API_URL + "api/product/";

const URL1 = process.env.REACT_APP_API_URL + "api/newproduct/";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export const getProductsWithTrader = async() => {
    try{
        const getProductsResponse = await fetch(URL1 + "products", options("GET"))
        if (getProductsResponse.ok) {
            const productsdata = await getProductsResponse.json();
            const {status,data} = productsdata;
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
export const getProductsWithCode = async(traderCode) => {
    try{
        const getProductsResponse = await fetch(URL1 + `${traderCode}`, options("GET"))
        if (getProductsResponse.ok) {
            const productsdata = await getProductsResponse.json();
            const {status,data} = productsdata;
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
export const createTraderProduct = async(supplierOrderObj) => {

    try{
        const createTraderProductResponse = await fetch(URL1 + 'create', options("POST", supplierOrderObj))
        if (createTraderProductResponse.ok) {
            const {status,data} = await createTraderProductResponse.json();
  
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
export const updateTraderProduct = async(tradercode,supplierOrderObj) => {
    try{
        const{_id,productName,traders} = supplierOrderObj;
        const productDTO = {
            _id,productName,traders
        }
        const updateTraderProductResponse = await fetch(URL1 + `${tradercode}`, options("PATCH", productDTO))
        if (updateTraderProductResponse.ok) {
            const {status,data} = await updateTraderProductResponse.json();
  
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

export const addSupplierFavourite = async(supplierFavouriteObj) => {

    try{
        const addSupplierFavouriteResponse = await fetch(URL1 + 'createFav', options("POST", supplierFavouriteObj))

        if (addSupplierFavouriteResponse.ok) {
            const {status,data} = await addSupplierFavouriteResponse.json();
  
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

export const deleteSupplierFavourite = async(supplierFavouriteObj) => {

    try{
        const addSupplierFavouriteResponse = await fetch(URL1 + 'delFav', options("DELETE", supplierFavouriteObj))

        if (addSupplierFavouriteResponse.ok) {
            const {status,data} = await addSupplierFavouriteResponse.json();
  
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


export const getFavouritesWithCode = async(supplierCode) => {
    try{
        const getFavouritesResponse = await fetch(URL1 + '/favorites', options("GET"))
        if (getFavouritesResponse.ok) {
            const productsdata = await getFavouritesResponse.json();
            const {status,data} = productsdata;
            if(status){
                const newFavData = data.filter(f => f.fav.includes(supplierCode))
                return {'status':true,'data':newFavData};
            }
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