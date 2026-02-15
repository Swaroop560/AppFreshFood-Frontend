const URL = process.env.REACT_APP_API_URL + "api/product/";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export const getProducts = async() => {
    try{
        const getProductsResponse = await fetch(URL + "products", options("GET"))
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