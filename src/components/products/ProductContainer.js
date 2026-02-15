import React,{useEffect,useState} from 'react'
import ProductComponent from './ProductComponent'
import { getProducts } from '../../services/productService'
import {getProductsWithTrader, createTraderProduct,getProductsWithCode,updateTraderProduct } from '../../services/newProductService'
import { useAuth } from '../../context/Auth'
import { createTraderInventory,getInventoryByTrader,updateInventory,deleteInventory} from '../../services/inventory'
import AddProductComponent from './AddProductComponent'

const ProductContainer = () => {

    const{userName,code} = useAuth();
    const[products,setProducts] = useState([])
    const[isQty,setIsQty] = useState({
        kg:false,
        number:false
    })
    const[traderProducts,setTraderProducts] = useState([])
    const[traderProductsList,setTraderProductsList] = useState([])
    const[searchQuery, setSearchQuery] = useState('')
    const[showAddProducts, setShowAddProducts] = useState(false)
    const[availability,setAvailability] = useState('')
    const[type,setType] = useState('')
    const[newProductItem,setNewProductItem] = useState({})
    const[addProductInfo,setAddProductInfo] = useState({ })
    const[addProductsData, setAddProductsData] = useState({
        "productId": "",
        "productName": "",
        "image": "",
        "traderCode": "",
        "category": null,
        "productInfo":{
            "box":{status:false,boxp:0,qty:0,min_box:0,max_box:0},
            "kg":{status:false,kgp:0,qty:0,min_kg:0,max_kg:0},
            "number":{status:false,numberp:0,qty:0,min_number:0,max_number:0},
            "tray":{status:false,trayp:0,qty:0,min_tray:0,max_tray:0}
        },
        "info": {
          "price": {
            "boxp": 0,
            "trayp": 0,
            "kgp": 0,
            "numberp": 0
          },
          "qty": {
            "box": 0,
            "tray": 0,
            "kg": false,
            "number": false
          },
          "availability": {
            "weekly": [],
            "seasonal": {"startDate":"","endDate":""},
            "yearly": false
          },
          "inventory": {
            "min_kg": 0,
            "max_kg": 0,
            "min_box": 0,
            "max_box": 0,
            "min_tray": 0,
            "max_tray": 0,
            "min_number": 0,
            "max_number": 0
          }
        }
      }
    );
    const newProduct = {
      "productId":"",
      "productName": "",
      "image": "",
      "category": null,
      "traders":[]
    }
    const newProductTradersInfo =  {
      "traderCode":"",
      "traderName":"",
      "box":{"status":false,"price":0,"qty":0,"min":0,"max":0},
      "tray":{"status":false,"price":0,"qty":0,"min":0,"max":0},
      "number":{"status":false,"price":0,"qty":0,"min":0,"max":0},
      "kg":{"status":false,"price":0,"qty":0,"min":0,"max":0},
      "weekly":[],
      "yearly":false,
      "seasonal":{ "startDate":"","endDate":""}
    }
    const newProductInfo = { "productId": "",
    "productName": "",
    "image": "",
    "traderCode": "",
    "category": null,
    "productInfo":{
        "box":{status:false,boxp:0,qty:0,min_box:0,max_box:0},
        "kg":{status:false,kgp:0,qty:0,min_kg:0,max_kg:0},
        "number":{status:false,numberp:0,qty:0,min_number:0,max_number:0},
        "tray":{status:false,trayp:0,qty:0,min_tray:0,max_tray:0}
        },
        "availability": {
            "weekly": [],
            "seasonal": {"startDate":"","endDate":""},
            "yearly": false
          }
    }
    const newProductData = {
        productId:'',
        productName:'',
        image:'',
        category: null,
        info: {
          price: {
            boxp: 0,
            trayp: 0,
            kgp: 0,
            numberp: 0
          },
          qty: {
            box: 0,
            tray: 0,
            kg: false,
            number: false
          },
          availability: {
            weekly: [],
            seasonal: { startDate: "", endDate: "" },
            yearly: false
          },
          inventory: {
            min_kg: 0,
            max_kg: 0,
            min_box: 0,
            max_box: 0,
            min_tray: 0,
            max_tray: 0,
            min_number: 0,
            max_number: 0
          }
        }
    };

    useEffect(() => {
        async function fetchData(){
            const {status,data} = await getProducts();
            if(status){
              setProducts(data)
              invokeTraderProducts();
              invokeTraderProductsList();
            }  
          }
          fetchData()

          return () => {

          }
    },[])
    const invokeTraderProductsList = async() => {
      const {status,data} = await getProductsWithTrader()
      if(status)
      setTraderProductsList(data)
    }
    const invokeTraderProducts = async() => {
        const {status,data} = await getProductsWithCode(code)
        if(status)
        setTraderProducts(data)
    }
    const handleSearch = (e) => {
        let searchValue = e.target.value;
        setSearchQuery(searchValue); 
    }
    const toggleAddProduct = (product={}) => {

        // const {productName, image, category} = product;
        setSearchQuery(''); 
        setAvailability('')
        setIsQty({kg:false,number:false})
        setType('')
         if(showAddProducts){
            // setAddProductInfo({...newProductData,productId,productName,image})
            setNewProductItem({...product})
         }
        setShowAddProducts(!showAddProducts)
    }
    const handleAddProduct = (product) => {

        const {productId,productName,image,category,traders} = product;
        
        if (category && category.length > 0) {
         
          // const{kg,number} = newProductTradersInfo
          // // const{productInfo} = product;
         
          // if(kg.status) {
          //   setIsQty({kg:kg.status}) //productInfo.kg.status
          // }
          // if(number.status){
          //   setIsQty({number:number.status})
          // }
          const traderInfo = traders.filter(trader => trader.traderCode === code);
          const prodItem = {...product,traders:traderInfo}
          setNewProductItem({...prodItem})
        } else {
            // setAddProductInfo({...newProductInfo,productId,productName,image});
            if(newProduct.traders.length > 0){
                newProduct.traders.splice(0,newProduct.traders.length)
            }
            if(newProduct.traders.length === 0){
              newProduct.productId = productId;
              newProduct.image=image;
              newProduct.productName = productName;
              newProduct.traders.push(newProductTradersInfo)
            }
            setNewProductItem({...newProduct})
        }
      
        toggleAddProduct(product);
       
    }
    const handleCheckBox = (name,state) => {

      // const infoData = { ...newProductItem };
      // addProductInfo.traders[0]?.[`${name}`]?.status
      newProductItem.traders[0][`${name}`].status = state;

      if (name === 'number') {
        
        //infoData.productInfo.number.status = state;
       // const val = checked ? checked : value;
        // setIsQty({...isQty,number:checked})            
      }
      if (name === 'kg') {
        //  infoData.productInfo.kg.status = state;
        // setIsQty({...isQty,kg:checked})
      }  
    }
    const handleInfoChange = (e) => {
        const { name, value, type, checked } = e.target;
        const infoData = { ...newProductItem };
        
        if (type === 'date') {
          if (name === 'start-date') {
            infoData.traders[0].seasonal.startDate = value;
          }
          if (name === 'end-date') {
             infoData.traders[0].seasonal.endDate = value;
          }
        } 
        if (type === 'number') {
          if (name === 'box') {
            infoData.traders[0].box.status = parseInt(value, 10) > 0 ? true : false;
            infoData.traders[0].box.qty = parseInt(value, 10);
          }
          if (name === 'tray') {
            infoData.traders[0].tray.status = parseInt(value, 10) > 0 ? true : false;
            infoData.traders[0].tray.qty = parseInt(value, 10);
          }
        } 
        if (type === 'checkbox') {
          const index = infoData.traders[0].weekly.indexOf(value);
          if (checked && index === -1) {
            infoData.traders[0].weekly.push(value);
          } else if (!checked && index !== -1) {
            infoData.traders[0].weekly.splice(index, 1);
          }
        }
        else {
          infoData.traders[0].traderCode = code;
          infoData.traders[0].traderName = userName;
        }

        setNewProductItem({ ...newProductItem });
    };
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if(name === 'type')
            setType(value)
        if(name==='available')
            setAvailability(value)
    };
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(newProductItem.category === null){
          
          newProductItem.category = "Fruits&Veg";

          if(availability && availability === 'yearly' ) {
            newProductItem.traders[0].yearly = true;
          } 
          const productExistInList = traderProductsList.filter(t => t.productId === newProductItem.productId);
          const productExist = traderProducts.filter(t => t.productId === newProductItem.productId);

              if (Object.keys(productExist).length > 0) {
                  alert('Product Already Exists')
                  toggleAddProduct()
                  return;
              }
              else if(productExistInList){
                  // const{traders} = newProductItem;
                  const { status } = await createTraderProduct(newProductItem);
                  if (status)
                  alert('Trader Added Successfully...')
                  invokeTraderProducts()
                  toggleAddProduct()
                  return;
              }
              else {
                  const { status } = await createTraderProduct(newProductItem);
                  if (status)
                  alert('Product Added Successfully...')
                  invokeTraderProducts()
                  toggleAddProduct()
                  return;
              }
          }
          if(newProductItem.category){
               // handleUpdateInventory(newProductItem._id,newProductItem)
               const { status } = await updateTraderProduct(code,newProductItem);
               if (status)
               alert('Product Updated Successfully...')
               invokeTraderProducts()
               toggleAddProduct()
          }

      //   if( addProductInfo.category === null){
      //     addProductInfo.traderCode = code;
      //     addProductInfo.category = "Fruits&Veg";
      //     const productObj = traderProducts.filter(t => t.productId === addProductInfo.productId)
      //     // Your form submission logic here
      //     if (Object.keys(productObj).length > 0) {
      //       alert('Product Already Exists')
      //       toggleAddProduct()
      //       return;
      //     } else {
      //       const { status } = await createTraderInventory(addProductInfo);
      //       if (status)
      //         alert('Product Added Successfully...')
      //       invokeTraderProducts()
      //       toggleAddProduct()
      //     }
      //  }
      //   if(!addProductInfo.category){
      //     handleUpdateInventory(addProductInfo._id,addProductInfo)
      //   }
        
      };
      const deleteInventoryProduct = async(id,index) => {
            const {status} = await deleteInventory(id);
            if(status){
                const newTradersData = [...traderProducts];
                newTradersData.splice(index,1)
                setTraderProducts([...newTradersData])
              }
              else{
                alert('Delete Operation Failed')
              }
      } 
      const handleUpdateInventory = async(id,productObj) =>{
          console.log('updated Product Obj',productObj)
          const{status} = await updateInventory(id,productObj)
          if(status){
            alert('Product Update Successful')
            toggleAddProduct()
          }
      }
  return (
    <>
    {
        showAddProducts ?  
        <AddProductComponent 
        handleChange={handleChange} 
        handleInfoChange={handleInfoChange}
        addProductInfo={newProductItem} 
        toggleAddProduct={toggleAddProduct}
        type={type}
        isQty={isQty}
        availability={availability}
        newProductTradersInfo={newProductTradersInfo}
        handleUpdateInventory={handleUpdateInventory}
        handleCheckBox={handleCheckBox}
        handleSubmit={handleSubmit}/> 
        :  
        <ProductComponent
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        handleAddProduct={handleAddProduct}
        traderProducts={traderProducts}
        deleteInventoryProduct={deleteInventoryProduct}
        products={products} />
  
    }         
    </>
  )
}

export default ProductContainer