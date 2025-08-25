import PropTypes from "prop-types";

import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "store/CartSlice";
import "./index.css";
import CInput from "components/c_input.jsx";
import { useMemo } from "react";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // cart items
  const cartItems = useMemo(
    () => cart.map((item) => ({ ...item, quantity: item.quantity ?? 1 })),
    [cart]
  );

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const { quantity, cost } = item;
        const realCost = parseInt(cost, 10);
        return total + quantity * realCost;
      }, 0),
    [cartItems]
  );

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    dispatch(addItem({ ...item, quantity: +item.quantity + 1 }));
  };

  const changeQuantity = (item, quantity) => {
    dispatch(addItem({ ...item, quantity }));
  };

  const handleDecrement = (item) => {
    dispatch(addItem({ ...item, quantity: +item.quantity - 1 }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
    dispatch(updateQuantity(-1));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const total = item.quantity * parseInt(item.cost, 10);
    return total;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount}
      </h2>
      <div>
        {cartItems.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  disabled={item.quantity < 2}
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <CInput
                  className="cart-item-quantity-value"
                  value={item.quantity}
                  max={99}
                  onChange={(val) => changeQuantity(item, val)}
                />
                <button
                  className="cart-item-button cart-item-button-inc"
                  disabled={item.quantity > 98}
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button m-r-15"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <button className="get-started-button1" onClick={()=> alert("Coming soon!")}>Checkout</button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
