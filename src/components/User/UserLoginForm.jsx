import { useState } from "react";
import { loginUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";

import s from "../../assets/styles/User.module.css"

const UserLoginForm = ({ closeForm, toggleCurrentFormType }) => {

  const dispatch = useDispatch()

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // const isNotEmpty = Object.values(values).some((val) => val)
    // if (isNotEmpty) return

    dispatch(loginUser(values))
    closeForm()
  }

  return (
    <div className={s.wrapper}>
      <div className={s.close} onClick={closeForm}>
        <svg fill="inherit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" id="close">
          <path d="M4.375 4.375L15.625 15.625" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M4.375 15.625L15.625 4.375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
      <div className={s.title}>Log in</div>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.group}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.group}>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
            required
          />
        </div>

        <div className={s.link} onClick={() => toggleCurrentFormType('signup')}>
          Create an account
        </div>
        <button
          className={s.submit}
          type="submit"
        >Logint</button>
      </form>
    </div>
  );
}

export default UserLoginForm;