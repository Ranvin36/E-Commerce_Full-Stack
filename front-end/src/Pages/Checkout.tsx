import React, { useEffect, useState } from "react"
import InputFields from "../Components/InputFields"
import LongFields from "../Components/LongInput"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { types } from "../redux/types"
import { toast } from "react-toastify"
import { clearCart, removeProductFromCart } from "../redux/cartReducer"
import { Button } from "@mui/material"
import PreLoader from "./PreLoader"
interface ProductDetails{
    _id:number,
    price:string,
    name:string,
    image:string,
}

interface OrderDetails{
    selected_color:string,
    selected_storage: string,
    user: number,
    _id: number,
    product:ProductDetails
    
}


const Checkout : React.FC = () =>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [city, setCity] = useState("")
    const [orderPlaced, setOrderPlaced] = useState(false)
    const [orderDetails,setOrderDetails]  = useState<OrderDetails[]>([])
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((state:types) => state.reducer.data)
    let totalPrice = 0;
    async function fetchOrderItems(){
        const response =  await axios.get("http://127.0.0.1:8000/api/cart/products/",{
            headers:{
                Authorization: `Bearer ${user.token}`
            }
        })
        setOrderDetails(response.data)
    }

    async function createOrder(e:React.MouseEvent<HTMLButtonElement>){
        console.log("inside")
        e.preventDefault()
        if (firstName.length>0 && lastName.length>0 && address.length>0 &&zipCode.length>0 && city.length>0){
            setOrderPlaced(true)
            const data =  {first_name:firstName, last_name:lastName, shipping_address:address , zip_code:zipCode , city:city , payment_method:"cash-in-hand"}
            const response  =await axios.post("http://127.0.0.1:8000/api/cart/checkout/9", data , {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            })
            console.log(response.data)

            dispatch(clearCart())
            Navigate('/')
        }
        else{
            toast.error("All Fields Are Required!")

        }
    }

    useEffect(() =>{
        fetchOrderItems()
    },[])

    return(   
        <>     
            {orderPlaced ? 
                <PreLoader message="Order Placed Successfully - Receipt Emailed"/>
                :

            
        <div className="checkout-container">
            <div className="checkout-flex">
                <div className="checkout-structure">
                    <div className="cart-title">
                        <h2>CHECKOUT</h2>
                    </div>
                    <div className="checkout-namings">
                        <InputFields title="First Name" type="text" onChange={setFirstName} />
                        <InputFields title="Last Name" type="text" onChange={setLastName} />
                    </div>
                    <LongFields title="Address" type="text" onChange={setAddress} />
                    <div className="checkout-namings">
                        <InputFields title="ZIP Code" type="text" onChange={setZipCode} />
                        <InputFields title="City" type="text" onChange={setCity} />
                    </div>
                        <div className="payment-title">
                            <h2>PAYMENT METHOD</h2>
                        </div>
                    <div className="payment-options">
                        <div className="payment-option">
                            <input type="radio" name="" id="" />
                            <label htmlFor="">Cash In Hand</label>
                        </div>
                    </div>
                    <hr />
                    <div className="order-items">
                        <div className="checkout-title">
                            <h2>Order Details</h2>
                        </div>
                        {orderDetails && orderDetails.map(function(item:OrderDetails,index){
                            const productImage= `http://127.0.0.1:8000${item.product.image}`
                            totalPrice+=parseInt(item.product.price)
                            return(
                                <div className="order-layout" key={index}>
                                    <div className="order-img">
                                        <img src={productImage} alt="product-image" />
                                    </div>
                                    <div className="order-details">
                                        <h3>{item.product.name}</h3>
                                        {item.selected_color &&
                                            <h4>Color : {item.selected_color} , Storage : {item.selected_storage}GB</h4>
                                        }
                                        <h4>${item.product.price}</h4>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="checkout-summary">
                        <div className="checkout-title">
                            <h2>Summary</h2>
                        </div>
                        <div className="checkout-details">
                            <div className="checkout-values">
                                <h3>Original Price: </h3>
                                <h4>${totalPrice}</h4>
                            </div>
                            <div className="checkout-values">
                                <h3>Discount Price: </h3>
                                <h4>$0</h4>
                            </div>
                            <div className="checkout-seperator"></div>
                            <div className="checkout-values">
                                <h3>Subtotal Price: </h3>
                                <h4>${totalPrice}</h4>
                            </div>
                            <div className="checkout-values">
                                <h3>Delivery Charges: </h3>
                                <h4>$2.5</h4>
                            </div>
                            <div className="checkout-seperator"></div>

                            <div className="checkout-values">
                                <h3>Total: </h3>
                                <h4>${totalPrice + 2.5}</h4>
                            </div>
                            <div className="complete-checkout">
                                <Button type='button' style={{textDecoration:"none",color:"#fff"}} onClick={(e)=>createOrder(e)}>Complete Checkout</Button>
                            </div>

                        </div>
                </div>
            </div>
        </div>
        }
        </>

    )
}

export default Checkout