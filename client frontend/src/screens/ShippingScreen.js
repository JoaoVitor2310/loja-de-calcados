import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";

import { saveShippingAddress } from "../Redux/slices/cartSlice";

const ShippingScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const initialState = JSON.parse(localStorage.getItem("shippingAddress"));
  const cart = useSelector((state) => state.cart);

  let [street, setStreet] = useState(initialState.street);
  const [number, setNumber] = useState(initialState.number);
  const [complement, setComplement] = useState(initialState.number);
  const [neighborhood, setNeighborhood] = useState(initialState.number);
  const [city, setCity] = useState(initialState.city);
  const [CEP, setCEP] = useState(initialState.CEP);
  const [country, setCountry] = useState(initialState.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const fullAddress = {street, number, complement, neighborhood, city, CEP, country};
    dispatch(saveShippingAddress(fullAddress));
    history.push("/payment");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>ENDEREÇO DE ENTREGA</h6>
          <input
            type="text"
            placeholder="Rua"
            value={street}
            required
            onChange={(e) => setStreet(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número"
            value={number}
            required
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Complemento"
            value={complement}
            required
            onChange={(e) => setComplement(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={neighborhood}
            required
            onChange={(e) => setNeighborhood(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cidade"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="text"
            placeholder="CEP"
            value={CEP}
            required
            onChange={(e) => setCEP(e.target.value)}
          />
          <input
            type="text"
            placeholder="País"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Continuar</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
