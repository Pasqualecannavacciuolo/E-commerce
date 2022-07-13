require("dotenv").config()

const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:4200",
  })
)

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY)

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map(item => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.titolo,
            },
            unit_amount: item.prezzo * 100,
          },
          quantity: 1,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/home`,
      cancel_url: `${process.env.CLIENT_URL}/profile`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

app.listen(5000)
