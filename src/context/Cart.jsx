import { createContext,useContext,useState } from "react";

const cartContext = createContext(null);

export const useCart = () => {
    return useContext(cartContext);
}

export const CartProvider = (props) => {
    
   // const {firstName} = localStorage.getItem('authData');

    const[cartItems, setCartItems] = useState([])
    const[isItemAdded,setIsItemAdded] = useState(false)

    const addToCart = (item) => {
        const isItemExists = cartItems.some((citem) => citem._id === item._id)
        // console.log(isItemExists)
        if(!isItemExists){
            setCartItems([...cartItems, item]);
            setIsItemAdded(true)
            return true;
        }
        return false;  
        
    };

    const updateCart = (id,quantity,type,price) => {
        const isItemExists = cartItems.some((citem) => citem.productId === id)
        // console.log(isItemExists)
        if(isItemExists){
            const newCartItems = cartItems.map((c) => {
                if(c.productId  === id) {
                    c.quantity = quantity;
                    c.type = type;
                    c.total = parseInt(quantity) * price;
                    return c;
                }
                return c;
            })
            setCartItems([...newCartItems]);
            setIsItemAdded(true)
            return true;
        }
        return false;  
        
    };

    const removeFromCart = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    const clearCart = (index) => {
        setCartItems([]);
    };

    return(
        <cartContext.Provider value = {{ cartItems, setCartItems,addToCart,removeFromCart,isItemAdded,updateCart,clearCart}}>
            {props.children}
        </cartContext.Provider>
    )
}