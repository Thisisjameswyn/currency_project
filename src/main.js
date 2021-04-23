import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import ExchangeReturn from "./js/exchangeService";

// function clearFields() {
//   $("#amount").val("");
// }

// function getElements(response) {
//   if (response.result === "success") {
//     $(".showConv").text(
//       `The conversion rate from ${} to ${} is : ${
//         response.conversion_rate
//       } for a total value of ${(
//         _amount * response.conversion_rate
//       ).toLocaleString("en", { style: "currency", currency: outPut })}`
//     );
//   } else if (response["error-type"] === "unsupported-code") {
//     $(".showErrors").text("Sorry that type of currency is not supported");
//   } else if (response.result === "error") {
//     $(".showErrors").text(
//       `Uh-oh, something went wrong: ${response["error-type"]}`
//     );
//   } else {
//     $(".showErrors").text(`Uh-oh, something went wrong: ${response.message}`);
//   }
// }

$(document).ready(function () {
  ExchangeReturn.getExRate().then(function (response) {
    if (response.result === "success") {
      const body = JSON.parse(response);
      const conversionRates = Object.entries(body.conversion_rates);
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
      $(".showErrors").text("Sorry that type of currency is not supported");
    } else if (response.result === "error") {
      $(".showErrors").text(
        `Uh-oh, something went wrong: ${response["error-type"]}`
      );
    } else {
      $(".showErrors").text(`Uh-oh, something went wrong: ${response.message}`);
    }
  });

  $("#search").click(function () {
    let amount = parseInt($("#amount").val());
    // const curOneText = $("#currencyOne option:selected").text();
    // const curTwoText = $("#currencyTwo option:selected").text();
    // const curOne = $("#currencyOne").val();
    // const curTwo = $("#currencyTwo").val();
    if (isNaN(amount)) {
      $(alert("please enter an amount"));
      location.reload();
    }
    // clearFields();
    // ExchangeReturn.getExRate(curOne, curTwo).then(function (response) {
    //   getElements(response, curOneText, curTwoText, amount, curTwo);
    // });
  });
});
