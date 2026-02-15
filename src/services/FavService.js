const URL = process.env.REACT_APP_API_URL + "api/favourite";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export async function createFavourite(productItem){

    try{
        const createFavResponse = await fetch(URL + '/createFavourite', options("POST", productItem))
        if (createFavResponse.ok) {
            const {status,data} = await createFavResponse.json();
            // const user_data = JSON.stringify(userdata);
            //localStorage.setItem('authData', user_data )
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

export async function getFavourites(userid){

    try{
        const getFavResponse = await fetch(URL + '/user/'+`${userid}`, options("GET"))
        if (getFavResponse.ok) {
            const favdata = await getFavResponse.json();
            const {status,data} = favdata;
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

export async function deleteFavourites(id){

    try{
        const deleteFavResponse = await fetch(URL +`/${id}`, options("DELETE"))
        if (deleteFavResponse.ok) {
            const {status,message} = await deleteFavResponse.json();
          
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