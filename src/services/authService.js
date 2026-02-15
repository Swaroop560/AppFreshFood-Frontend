//const baseURL = 'https://freshfoodbe.azurewebsites.net/'


const URL = process.env.REACT_APP_API_URL  + "api/newuser";

const options = (method="GET",body) => {
    return{
        method,
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(body)
    }
}

export async function userSignIn(username, password){

    try{
        const signInResponse = await fetch(URL + '/login', options("POST", { username, password }))
        if (signInResponse.ok) {
            const userdata = await signInResponse.json();
            const user_data = JSON.stringify(userdata);
            //localStorage.setItem('authData', user_data )
            return {'status':true,'data':userdata};
        }
        else{
            return false
        }
    }
    catch(error){
        return false;
    }

}
export async function getUsers(){
    try{
        const getUserResponse = await fetch(URL + '/users', options("GET"))
        if (getUserResponse.ok) {
            const {status,data} = await getUserResponse.json();
            if(status)
                return {'status':true,'data':data};
            else
                return {'status':false,'data':[]};
        }
        else{
            return {'status':false,'data':[]};
        }
    }
    catch(error){
        return {'status':false,'message':error.message};
    }
}
export async function createUser(user){

    try{
        const createUserResponse = await fetch(URL + '/create', options("POST", user))
        if (createUserResponse.ok) {
            const {status,data} = await createUserResponse.json();
            if(status)
                return {'status':true,'data':data};
            else
                return {'status':false,'data':[]};
        }
        else{
            return {'status':false,'data':[]};
        }
    }
    catch(error){
        return {'status':false,'message':error.message};
    }

}