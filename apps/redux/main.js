import "bootstrap/dist/css/bootstrap.min.css";
import "/../../public/stylesheets/index.css";
import * as bootstrap from "bootstrap";
import $ from "jquery";

import store from './store';

const valueEl = document.getElementById("value");

function render() {
  const counterValue = store.getState().counterValue||0;
  valueEl.innerHTML = counterValue.toString();
}

render();
store.subscribe(render);

document.getElementById("increment").addEventListener("click", function () {
  store.dispatch({ type: "COUNTER/INCREMENT" });
});

document.getElementById("decrement").addEventListener("click", function () {
  store.dispatch({ type: "COUNTER/DECREMENT" });
});

document
  .getElementById("incrementIfOdd")
  .addEventListener("click", function () {
    const counterValue = store.getState().counterValue||0;
    if (counterValue % 2 !== 0) {
      store.dispatch({ type: "COUNTER/INCREMENT" });
    }
  });

document
  .getElementById("incrementAsync")
  .addEventListener("click", function () {
    setTimeout(function () {
      store.dispatch({ type: "COUNTER/INCREMENT" });
    }, 1000);
  });
