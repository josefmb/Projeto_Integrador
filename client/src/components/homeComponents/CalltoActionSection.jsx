import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Precisa de mais dicas?</h2>
              <p>Insira seu e-mail para receber dicas gratuítas!</p>
              <form className="form-section">
                <input placeholder="E-mail..." name="email" type="email" />
                <input value="Se inscrever" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
