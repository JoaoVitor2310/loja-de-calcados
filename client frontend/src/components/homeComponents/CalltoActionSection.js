import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Deseja receber promoções?</h2>
              <p>Cadastre-se e fique por dentro!.</p>
              <form className="form-section">
                <input placeholder="Seu email" name="email" type="email" />
                <input value="Sim, Eu quero!" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
