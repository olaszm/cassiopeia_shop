const express = require("express");
const history = require("connect-history-api-fallback");
const { join } = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51HGQmJF3taK9EUdAQI0Clpppiwd3rlqmVKKdP6Q4yWBcO2QYQJYNdGm2sSR1tLTUMmbKfOCq1RDCHptqWYkLuobH00LaVb2nqb"
);

const app = express();

app.use(history());

console.log(__dirname);
app.use(express.static(join(__dirname + "/dist")));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const calculateOrderPrice = (items = 1000, disc, delivery) => {
  const totalPrice = items.reduce((acc, curr) => {
    return (acc += curr.price * curr.amount);
  }, 0);
  return (
    (totalPrice + Number(delivery.price) - totalPrice * disc) *
    100
  ).toFixed(0);
};

app.post("/create-payment-intent", async (req, res) => {
  const { items, discount, delivery } = req.body;
  const discountRate = discount ? 0.1 : 0;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderPrice(items, discountRate, delivery),
    currency: "gbp",
  });

  res.json({
    clientSecret: paymentIntent.client_secret,
  });
});

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is Listening ` + port));
