import React, { useState, useEffect } from "react";
import "./Payment.css";
import axios from 'axios';
import CurrencyFormat from "react-currency-format";
import { Link, useHistory } from "react-router-dom";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "../StateProvider";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { db } from '../firebase';
function Payment() {
  const history = useHistory()
  const [{ basket, user }, dispatch] = useStateValue();
  let total = 0;
  basket.forEach((product) => {
    total += product.price;
  });
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [error, seterror] = useState(null);
  const [disabled, setdisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true)
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if(!user){
      alert('Please Login to proceed for the payment')
      history.push('/login')
    }
  },[])
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(`https://rithika-amazon-clone-api.herokuapp.com/payment/create?total=${total * 100}`)
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret()
  },[basket])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    }).then(({ paymentIntent }) => {
      //PaymentIntent = payment confirmation
      db.collection('users')
        .doc(user && user.uid)
        .collection('orders')
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
        })
      setSucceeded(true)
      seterror(null)
      setProcessing(false)
      dispatch({
        type: 'EMPTY_BASKET'
      })
      history.replace('/orders')
    }).catch((e) => alert(e))
  };

  const handleChange = (e) => {
    setdisabled(e.empty)
    seterror(e.error ? e.error.message: "");
  };
  return (
    <div className="paymnet">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket && basket.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user && user.email}</p>
            <p>123 React Lane</p>
            <p>Hyderabad, Telangana</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment_items">
            {basket.map((item) => (
              <CheckoutProduct {...item} key={item.id} />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal({basket?.length} items):{" "}
                        <strong>${total}</strong>
                      </p>
                    </>
                  )}
                  decimalScale={2}
                  value={0}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>processing</p>: "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Payment;
