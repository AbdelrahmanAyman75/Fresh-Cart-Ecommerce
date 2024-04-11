import axios from "axios";
import { createContext, useState } from "react";

export let CWashListContext =createContext();

export default   function CWashListContextprovider({children}){


    function addtocartwashList(productId){

return axios.post(
    'https://ecommerce.routemisr.com/api/v1/wishlist',
        {productId},
        
        {headers:{
            token:localStorage.getItem('token')
        }
    }
    )
    }



   

    function  removeproductwash(productId){
    return axios.delete(
        'https://ecommerce.routemisr.com/api/v1/wishlist/'+productId,
        {headers:{
            token:localStorage.getItem('token')
        }})
    }
return(
<>

<CWashListContext.Provider 
value={{ addtocartwashList ,removeproductwash}}

>
    {children}
    
    

</CWashListContext.Provider>


</>



)

}


