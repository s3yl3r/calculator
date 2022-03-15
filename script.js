function App() {
  const [egyenlet, egyenletallit] = React.useState("");
  const [megoldas, megoldasallit] = React.useState(0);
  const muvelet = /[+\-*/\.]/;
  const masik = /[+\-*/]/;
  const tobbi = /[+*/]/;
  const szam = /[0-9.]/;

  const mutat = (jel) => {
    if (muvelet.test(egyenlet[egyenlet.length-1]) && tobbi.test(jel) ) {
      egyenletallit(egyenlet.slice(0, egyenlet.length-1));
    }
    if (muvelet.test(egyenlet[egyenlet.length-2]) && egyenlet[egyenlet.length-1] =="-" && masik.test(jel)) {
      egyenletallit(egyenlet.slice(0, egyenlet.length-2));
    }
    if (egyenlet == "" && muvelet.test(jel)) {
      return;
    }
    if ((egyenlet == "0" || egyenlet =="" || masik.test(egyenlet[egyenlet.length-1])) && jel == "0") {
      return;
    }
    if ((/\./).test(egyenlet) && masik.test(egyenlet)==false && jel === ".") {
      return;
    }
    egyenletallit(elozo => elozo + jel);
    if (megoldas =="0" && szam.test(jel)) {
      megoldasallit(jel);
    } else if (/[1-9.]/.test(megoldas)) {
      megoldasallit(elozo => elozo + jel);
    } else {
      megoldasallit(jel);
    }
    if (egyenlet[egyenlet.length-1] == "=") {
      if (szam.test(jel)) {
        egyenletallit(jel);
        megoldasallit(jel);
      } else {
        egyenletallit(megoldas + jel);
      }
    }
  };

  const szamol = () => {
    megoldasallit(Math.round(eval(egyenlet)*1000000000)/1000000000);
    egyenletallit((elozo) => elozo + "=");
  };

  const torol = () => {
    egyenletallit("");
    megoldasallit(0);
  };

    return (
     <div className="doboz">
       <div className="kep">
         <input type="text" value={egyenlet} placeholder="0" disabled />
         <div className="megoldas" id="display">{megoldas}</div>
       </div>
      <div className="felulet">
       <div id="clear" className="gomb AC" onClick={torol}>AC</div>
       <div id="divide" className="gomb oszt" onClick={() => mutat("/")}>÷</div>
       <div id="multiply" className="gomb szor" onClick={() => mutat("*")}>x</div>
       <div id="seven" className="gomb het" onClick={() => mutat("7")}>7</div>
       <div id="eight" className="gomb nyolc" onClick={() => mutat("8")}>8</div>
       <div id="nine" className="gomb kilenc" onClick={() => mutat("9")}>9</div>
       <div id="subtract" className="gomb minusz" onClick={() => mutat("-")}>-</div>
       <div id="four" className="gomb negy" onClick={() => mutat("4")}>4</div>
       <div id="five" className="gomb ot" onClick={() => mutat("5")}>5</div>
       <div id="six" className="gomb hat" onClick={() => mutat("6")}>6</div>
       <div id="add" className="gomb plusz" onClick={() => mutat("+")}>+</div>
       <div id="one" className="gomb egy" onClick={() => mutat("1")}>1</div>
       <div id="two" className="gomb ketto" onClick={() => mutat("2")}>2</div>
       <div id="three" className="gomb harom" onClick={() => mutat("3")}>3</div>
       <div id="equals" className="gomb egyenlo" onClick={szamol}>=</div>
       <div id="zero" className="gomb nulla" onClick={() => mutat("0")}>0</div>
       <div id="decimal" className="gomb egesz" onClick={() => mutat(".")}>.</div>
      </div>
     </div>
    );
}

ReactDOM.render(<App />, document.getElementById("app"));