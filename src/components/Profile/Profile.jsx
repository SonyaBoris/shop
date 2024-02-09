import { useDispatch, useSelector } from "react-redux"
import s from "../../assets/styles/Profile.module.css"
import { useEffect, useState } from "react"
import { updateUser } from "../../features/user/userSlice"

const Profile = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector(({ user }) => user)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  })

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateUser(values))
  }
  useEffect(() => {
    if (!currentUser) return
    setValues(currentUser)
  }, [currentUser])
  return (
    <section className={s.profile}>
      {!currentUser ? <span>You need to login</span> : (
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
              type="name"
              name="name"
              placeholder="Your name"
              value={values.name}
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
          <div className={s.group}>
            <input
              type="avatar"
              name="avatar"
              placeholder="Your avatar"
              value={values.avatar}
              autoComplete="off"
              onChange={handleChange}
              required
            />
          </div>
         
          <button
            className={s.submit}
            type="submit">Update</button>
        </form>
      )}
    </section>
  );
}

export default Profile;