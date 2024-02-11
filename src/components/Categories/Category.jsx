import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../../features/api/apiSlice";

import Products from "../Products/Products";

import s from "../../assets/styles/Category.module.css"
import { useSelector } from "react-redux";


const Category = () => {

  const { id } = useParams()
  const { list } = useSelector(({ categories }) => categories);

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    title: "",
    price_min: 0,
    price_max: 0,
  }

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  }

  const [isEnd, setIsEnd] = useState(false)
  const [values, setValues] = useState(defaultValues)
  const [params, setParams] = useState(defaultParams)
  const [cat, setCat] = useState('')
  const [items, setItems] = useState([])

  const { data, isLoading, isSucces } = useGetProductsQuery(params)

  useEffect(() => {
    if (!id) return
    setItems([])
    setIsEnd(false)
    setValues(defaultValues)
    setParams({ ...defaultParams, categoryId: id })
  }, [id])

  useEffect(() => {
    if (!id || !list.length) return
    const { name } = list.find((item) => item.id === id * 1)
    setCat(name)
  }, [list, id])

  useEffect(() => {
    if (isLoading) return

    if (!data.length) return setIsEnd(true)

    const products = Object.values(data)
    if (!products.length) return

    setItems((_items) => [..._items, ...products])
  }, [data, isLoading])


  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setItems([])
    setIsEnd(false)
    setParams({ ...defaultParams, ...values })
  }
  const handleReset = () =>{
    setValues(defaultValues)
    setParams(defaultParams)
    setIsEnd(false)
  }

  return (
    <section className={s.wrapper}>
      <h2 className={s.title}>{cat}</h2>
      <form className={s.filters} onSubmit={handleSubmit}>
        <div className={s.filter}>
          <input type="text" name="title" placeholder="Product name" onChange={handleChange} value={values.title} />

        </div>
        <div className={s.filter}>
          <input type="number" name="price_min" placeholder="0" onChange={handleChange} value={values.price_min} />
          <span>Price from</span>
        </div>
        <div className={s.filter}>
          <input type="number" name="price_max" placeholder="0" onChange={handleChange} value={values.price_max} />
          <span>Price to</span>
        </div>
        <button type="submit" hidden />
      </form>
      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSucces || !items.length ? (
        <div className={s.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products title='' products={items} style={{ padding: 0 }} amount={items.length} />
      )}
      {!isEnd && (
        <div className={s.more}>
          <button onClick={() => setParams({ ...params, offset: params.offset + params.limit })}>See more</button>
        </div>
      )}
    </section>
  );
}

export default Category;