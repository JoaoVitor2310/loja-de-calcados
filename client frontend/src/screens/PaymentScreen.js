import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";

import {savePayment} from '../Redux/slices/cartSlice'

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePayment(paymentMethod));
    history.push("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>SELECIONE A FORMA DE PAGAMENTO</h6>
          <div className="payment-container">
            <div className="radio-container">
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  value='credit'
                  name="payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">Cartão de crédito</label>
              </div>

              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  value='pix'
                  name="payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">Pix</label>

              </div>
              <div>
                <input
                  className="form-check-input"
                  type="radio"
                  value='boleto'
                  name="payment"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <label className="form-check-label">Boleto</label>

              </div>

            </div>
          </div>
          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
