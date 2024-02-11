import { useDispatch, useSelector } from "react-redux";

import s from "../../assets/styles/Cart.module.css"
import { sumBy } from "../../utils/common";
import { addItemToCart, removeItemFromCart } from "../../features/user/userSlice";

const Cart = () => {
  const { cart } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const changeQuantity = (item, quantity) => {
    dispatch(addItemToCart({ ...item, quantity }))
  }
  const removeItem = (id) =>{
    dispatch(removeItemFromCart(id))
  }
  return (
    <section className={s.cart}>
      <h2 className={s.title}>Your cart</h2>
      {!cart.length ? (
        <div className={s.empty}>Here is empty</div>
      ) : (
        <>
          <div className={s.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item
              return <div className={s.item} key={id}>
                <div className={s.image} style={{ backgroundImage: `url(${images[0]})` }} />
                <div className={s.info}>
                  <div className={s.name}>{title}</div>
                  <div className={s.category}>{category.name}</div>
                </div>
                <div className={s.price}>{price} $</div>
                <div className={s.quantity}>
                  <div className={s.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                    <svg className="icon" fill="inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19" id="minus">
                      <path d="M15.4895 8.3125H3.51055C2.8834 8.3125 2.375 8.84316 2.375 9.5C2.375 10.1568 2.8834 10.6875 3.51055 10.6875H15.4895C16.1166 10.6875 16.625 10.1568 16.625 9.5C16.625 8.84316 16.1166 8.3125 15.4895 8.3125Z"></path>
                    </svg>
                  </div>
                  <span>{quantity}</span>
                  <div className={s.plus} onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}>
                    <svg fill="inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" id="plus">
                      <g clipPath="url(#clip0_103_316)">
                        <path d="M13.125 6.5625H8.4375V1.875C8.4375 1.3575 8.0175 0.9375 7.5 0.9375C6.9825 0.9375 6.5625 1.3575 6.5625 1.875V6.5625H1.875C1.3575 6.5625 0.9375 6.9825 0.9375 7.5C0.9375 8.0175 1.3575 8.4375 1.875 8.4375H6.5625V13.125C6.5625 13.6425 6.9825 14.0625 7.5 14.0625C8.0175 14.0625 8.4375 13.6425 8.4375 13.125V8.4375H13.125C13.6425 8.4375 14.0625 8.0175 14.0625 7.5C14.0625 6.9825 13.6425 6.5625 13.125 6.5625Z"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_103_316">
                          <rect width="15" height="15" fill="white"></rect>
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div className={s.total}>{price * quantity} $</div>
                <div className={s.close} onClick={()=>removeItem(item.id)}>
                  <svg fill="inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="close">
                    <path d="M4.375 4.375L15.625 15.625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M4.375 15.625L15.625 4.375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
              </div>
            })}
          </div>

          <div className={s.actions}>
            <div className={s.total}>
              TOTAL PRICE: {" "}
              <span>{sumBy(cart.map(({ quantity, price }) => quantity * price))} $</span>
            </div>
            <button className={s.proceed}>Proceed</button>
          </div>
        </>
      )}
    </section>
  );
}

export default Cart;