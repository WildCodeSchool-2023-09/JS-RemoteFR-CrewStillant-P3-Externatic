import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./inscriptionCandidat.css";

function InscriptionCandidat() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <main>
      <section className="signupCandidate">
        <div>
          <p>Nom:</p>
          <input type="text" placeholder="Doe" />
        </div>
        <div>
          <p>Prénom:</p>
          <input type="text" placeholder="John" />
        </div>
        <div>
          <p>E-mail:</p>
          <input type="text" placeholder="JohnDoe@mail.com" />
        </div>

        <div>
          <p>Date de Naissance:</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        <div>
          <p>Ville:</p>
          <input type="text" placeholder="Paris" />
        </div>
        <div>
          <p>Pays:</p>
          <input type="text" placeholder="France" />
        </div>
      </section>
      <section className="confirmButtonCandidate">
        <button type="button">
          Déposer
          <br /> C.V.
        </button>
        <button type="button">
          Confirmer <br /> Inscription
        </button>
      </section>
    </main>
  );
}

export default InscriptionCandidat;
