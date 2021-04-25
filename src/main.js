import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ExchangeReturn from "./js/exchangeService";

function clearFields() {
  $("#convertedAmount").val("");
}

function calcExchange(rateFrom, rateTo, amountFrom) {
  let curInUSD = amountFrom / rateFrom;
  let convertedAmount = curInUSD * rateTo;
  return convertedAmount;
}

$(document).ready(function () {
  ExchangeReturn.getExRate().then(function (response) {
    if (response.result === "success") {
      const conversionRates = Object.entries(response.conversion_rates);
      for (let i = 0; i < conversionRates.length; i++) {
        $("#currencyOne").append(
          $("<option>", {
            value: conversionRates[i][1],
            text: conversionRates[i][0],
          })
        );
        $("#currencyTwo").append(
          $("<option>", {
            value: conversionRates[i][1],
            text: conversionRates[i][0],
          })
        );
      }
    } else if (response["error-type"] === "unsupported-code") {
      $("#showErrors").text("Sorry that type of currency is not supported");
    } else if (response.result === "error") {
      $("#showErrors").text(
        `Uh-oh, something went wrong: ${response["error-type"]}`
      );
    } else {
      $("#showErrors").text(`Uh-oh, something went wrong: ${response.message}`);
    }
  });

  $("#converterSubmit").submit(function (event) {
    event.preventDefault();
    let amount = parseInt($("#convertedAmount").val());
    const curOneText = $("#currencyOne option:selected").text();
    const curTwoText = $("#currencyTwo option:selected").text();
    const curOne = $("#currencyOne").val();
    const curTwo = $("#currencyTwo").val();
    if (isNaN(amount)) {
      $(alert("please enter an amount"));
      location.reload();
    }
    clearFields();
    let convertedAmount = calcExchange(curOne, curTwo, amount);
    $("#output").text(
      `The conversion from ${curOneText} to ${curTwoText} is : ${convertedAmount.toLocaleString(
        "en",
        {
          style: "currency",
          currency: curTwoText,
        }
      )}`
    );
  });
});
