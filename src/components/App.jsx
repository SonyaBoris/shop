import { useEffect } from "react"
import AppRoutes from "./Routes/Routes"
import { useDispatch } from "react-redux"

import Footer from "./Footer/Footer"
import Header from "./Header/Header"
import Sidebar from "./Sidebar/Sidebar"

import { getCategories } from "../features/categories/categoriesSlice"
import { getProducts } from "../features/products/productsSlice"
import UserForm from "./User/UserForm"


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getProducts())
  }, [dispatch])
  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className="container">
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  )
}
export default App
