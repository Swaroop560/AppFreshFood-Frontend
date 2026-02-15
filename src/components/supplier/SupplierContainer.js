import React,{useState,useEffect} from 'react'
import SupplierComponent from './SupplierComponent';
import { createFavourite,getFavourites,deleteFavourites } from '../../services/FavService';
import { useAuth } from '../../context/Auth';
import { useCart } from '../../context/Cart'
import { getProducts } from '../../services/productService';
import { getUsers } from '../../services/authService';
import {getInventoryByTrader} from '../../services/inventory'
import {getProductsWithTrader,getFavouritesWithCode,addSupplierFavourite,deleteSupplierFavourite } from '../../services/newProductService'
import { createStandingOrder,deleteStandingOrders } from '../../services/standingOrderService';

// Sample product data
const productsData1 = [
  { id: 1, name: 'Apples', price: 10, image: '../assets/product-images/Apples.png' },
  { id: 2, name: 'Bananas', price: 20, image: '../assets/product-images/Bananas.png' },
  { id: 3, name: 'Beans', price: 30, image: '../assets/product-images/Beans.png' },
  { id: 4, name: 'Avocado', price: 20, image: '../assets/product-images/Avocado.png' },
  { id: 5, name: 'Beetroot', price: 10, image: '../assets/product-images/Beetroot.png' },
  { id: 6, name: 'BeurreBoscPears', price: 10, image: '../assets/product-images/Beurre_Bosc_Pears.png' },
  { id: 7, name: 'Black_Plums', price: 20, image: '../assets/product-images/Black_Plums.png' },
  { id: 8, name: 'Black_Seedless_Grapes', price: 30, image: '../assets/product-images/Black_Seedless_Grapes.png' },
  { id: 9, name: 'Blood_Oranges', price: 20, image: '../assets/product-images/Blood_Oranges.png'},
  { id: 10, name: 'Broccoli', price: 10, image: '../assets/product-images/Broccoli.png' }
];

const SupplierContainer = () => {

  const{addToCart,cartItems,isItemAdded} = useCart();
  const{userId,code} = useAuth()
 
  const [searchQuery, setSearchQuery] = useState('');
  const[products,setProducts] = useState([])
  const[tradersList,setTradersList] = useState([])
  const[traderSelected,setTraderSelected] = useState('')
  const[prodInfo,setProdInfo] = useState({})
  const[favourites,setFavourites] = useState([])
  const[quantity,setQuantity] = useState(0)
  const[type,setType] = useState('')
  const[cartFlag,setCartFlag] = useState(false)
  const[traderObj,setTraderObj] = useState({})
  const[isHovered, setIsHovered] = useState(false);
  const[isOpen, setIsOpen] = useState(false);
  const[isChecked,setIsChecked] = useState(false)
  const[sorderFlag,setsorderFlag] = useState(false)
  const[traderProductsList,setTraderProductsList] = useState([])
  const[deliveryDate,setDeliveryDate] = useState(new Date().toLocaleDateString('fr-CA'))
 


  useEffect(() =>{

    async function fetchData(){
      invokeFavourites()
      invokeUsers()
      invokeProducts()
      invokeTraderProductsList();
    }
    fetchData()
  },[])

  const invokeTraderProductsList = async() => {
    const {status,data} = await getProductsWithTrader()
    if(status)
    setTraderProductsList(data)
  }
  const invokeUsers = async() => {
    const {status,data} = await getUsers()
    if(status){
      const traderslist = data.filter(t => t.role === 'Trader')
      setTradersList(traderslist)
    }
      
  }
  const invokeFavourites = async() => {
    const {status,data} = await getFavouritesWithCode(code)
    if(status)
    setFavourites(data)
  }
  const invokeProducts = async() => {
    const {status,data} = await getProducts() //getInventoryByTrader(traderSelected)
    if(status)
      setProducts(data)
  }
  const handleSearch = (e) => {
      let searchValue = e.target.value;
      setSearchQuery(searchValue); 
  }
  const handleChange = (e,item={}) => {
      const{name,value} = e.target;
      if(name === 'type'){
        setType(value)
      }
      if(name === 'quantity'){
        setQuantity(value)
      }
      if(name === 'select'){
        setTraderSelected(value)
      }
      if(name === 'date'){
        setDeliveryDate(value)
      }
      if(name === 'btnPrice'){
        setTraderObj({...item})
      }
  }
  const handleMouseEnter = (e,id) =>{
    console.log(id)
    //setIsHovered(true)
    const filter_hovered_item = products.map((item,idx) => {
      if(item.id === id)
        return {...item,hovered:true}
      return item;
    })
    setProducts(filter_hovered_item)
  }
  const handleMouseLeave = (e,id) =>{
    const filter_hovered_item = products.map((item,idx) => {
      if(item.id === id)
        return {...item,hovered:false}
      return item;
    })
    setProducts(filter_hovered_item)
  }
  const handleOrder = (product) => {
    setType('')
    setQuantity(0)
    setCartFlag(false)
    const productExistInList = traderProductsList.filter(t => t.productId === product.productId);
    if(productExistInList.length > 0){
      setProdInfo({...productExistInList[0]})
    }
   
    if(productExistInList.length === 0){
      setProdInfo({...product})
    }
    
    if(!isOpen)
      toggleModal()
    
  }

  const addCart = async(e,product,deliveryDate) => {
    
    e.preventDefault()
    console.log('add-cart',product)
    if(type && quantity){ 
      const{code,value} = traderObj;
      let itemPrice = value.split('$')
      const{_id,productId,productName,image} = product;
      const newProduct = {_id,productId,productName,image,type,traderCode:code,price:parseInt(itemPrice[1]),quantity,total:parseInt(quantity) * parseInt(itemPrice[1]),delivery:deliveryDate};
      const status = addToCart(newProduct)
      if(isChecked){
        //{userID:userId,productID:_id,productName,image,traderCode,type,quantity:parseInt(quantity),price:parseInt(quantity) * parseInt(itemPrice[1])}
        const newStandingOrderProduct = {...product,userID:userId,type,quantity:parseInt(quantity),price:parseInt(quantity) * parseInt(itemPrice[1])}
        const stOrderResponse =await addStandingOrder(newStandingOrderProduct)
        if(stOrderResponse.status){
          setsorderFlag(true)
        }
      }
      if(status)
        setCartFlag(!false)
    }
    
  }
  const addStandingOrder = async(newProduct) => {
    const {status,data} = await createStandingOrder(newProduct)
    if(status)
      return {status,data};
  }
  const addFavourite = async(e,productId) => {
    e.stopPropagation()
    const createFavStatus = await addSupplierFavourite({productId,supplierCode:code})
    const{status,data} = createFavStatus
    if(status){
      setFavourites(prev => [...prev,data])
      setProdInfo({})
    }else{
      alert('Fav Add Failed')
    }

  }
  const delFavourite = async(id,index) => {
    const {status} = await deleteSupplierFavourite({productId:id,supplierCode:code});
    if(status){
      const newFavData = [...favourites];
      newFavData.splice(index,1)
      setFavourites([...newFavData])
    }
    else{
      alert('Delete Operation Failed')
    }
  }

  const toggleModal = () => {
    setType('')
    setQuantity(0)
    setIsOpen(!isOpen)
  }
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    // alert('Checkbox checked')
  };

  return (
    <>
       
        <SupplierComponent 
        searchQuery = {searchQuery}
        products = {products}
        prodInfo = {prodInfo}
        handleSearch = {handleSearch}
        handleOrder = {handleOrder}
        addCart = {addCart}
        handleChange = {handleChange}
        quantity = {quantity}
        type = {type}
        cartCount = {cartItems.length}
        cartFlag = {cartFlag}
        sorderFlag = {sorderFlag}
        isItemAdded = {isItemAdded}
        handleMouseEnter = {handleMouseEnter}
        handleMouseLeave = {handleMouseLeave}
        isHovered = {isHovered}
        addFavourite = {addFavourite}
        favourites = {favourites}
        delFavourite = {delFavourite}
        isOpen = {isOpen}
        toggleModal = {toggleModal}
        isChecked={isChecked}
        handleCheckboxChange={handleCheckboxChange}
        traders = {tradersList}
        traderProductsList={traderProductsList}
        deliveryDate={deliveryDate}
      />
    </>
    
  )
}

export default SupplierContainer