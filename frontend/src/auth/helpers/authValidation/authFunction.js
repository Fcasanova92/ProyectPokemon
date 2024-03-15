export const logIn = ()=>{



}

export const logOut = () => {



}

export const fetchUser = async () => {
    const response = await fetch('http://127.0.0.1:5000/user');
    const data = await response.json();
    return {
        username:data.username,
        login:true
    }
  };


export const addRegister = async (data) => {

    try{

    const register = await fetch('http://127.0.0.1:5000/register', {

        method:'POST',

        headers: {

            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)


    })

    const resp = await register.json();

    const status = register.ok

    return {resp, status}

}catch(error){

    return(error)
}
   
}

