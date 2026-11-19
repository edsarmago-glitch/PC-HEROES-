/* ORDER NOW on the solo product pages:
   opens the visitor's email app with the t-shirt info already written,
   addressed to the orders inbox. Uses a Bootstrap toast for the confirmation. */
(function () {
  var ORDER_EMAIL = "orders@examplewebsite142.com";
  var btn = document.getElementById("order-now");
  if (!btn) return;

  function text(sel) {
    var el = document.querySelector(sel);
    // innerText keeps line breaks (e.g. "Everyday<br>Comfort") as spaces
    return el ? (el.innerText || el.textContent).replace(/\s+/g, " ").trim() : "";
  }

  btn.addEventListener("click", function () {
    var name = text(".info h1");
    var size = text(".sizes button.on") || "M";
    var qty = parseInt(text(".qty output"), 10) || 1;
    var unit = parseFloat(text(".info .price").replace(/[^\d.]/g, "")) || 499;
    var total = (unit * qty).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var unitTxt = unit.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    var subject = "Order: " + name + " T-shirt (Size " + size + ") x" + qty;
    var body = [
      "Hi kúro-kurò!",
      "",
      "I would like to order this t-shirt:",
      "",
      "T-shirt: " + name,
      "Size: " + size,
      "Quantity: " + qty,
      "Price: ₱" + unitTxt + " each (tax included)",
      "Total: ₱" + total,
      "Product page: " + location.href.split("#")[0],
      "",
      "My details:",
      "Full name: ",
      "Mobile number: ",
      "Delivery address: ",
      "Payment method (Cash on Delivery / GCash / Bank Transfer): ",
      "",
      "Thank you!"
    ].join("\n");

    window.location.href = "mailto:" + ORDER_EMAIL +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    var toastEl = document.getElementById("order-toast");
    if (toastEl && window.bootstrap) {
      toastEl.querySelector(".toast-body").textContent =
        "Opening your email app with your " + name + " (" + size + ", x" + qty + ") order to " + ORDER_EMAIL + ". Just press Send!";
      bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 6000 }).show();
    }
  });
})();
