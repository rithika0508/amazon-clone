import React, { useStatey } from 'react';
import { useHistory } from 'react-router-dom';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../StateProvider';
function Subtotal() {
    const history = useHistory()
    let total=0;
    const [ { basket }, dispatch ] = useStateValue()
    basket.forEach((product) => {
        total+=product.price
    })
    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal({basket?.length} items): <strong>${total}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/>This order contains a gift
                        </small>
                    </>
                )}
            decimalScale={2}
            value={0}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}/>
            <button onClick={e => history.push('/payment')}>Proceed to checkout</button>
        </div>
    )
}

export default Subtotal

