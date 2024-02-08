import s from "../../assets/styles/Home.module.css"

import BG from "../../assets/image/computer.png"

const Poster = () => {
  return (
    <section className={s.home}>
      <div className={s.title}>big sale 20%</div>
      <div className={s.product}>
        <div className={s.text}>
          <div className={s.subtitle}>the beastsellers of 2023</div>
          <h1 className={s.head}>Lennon r2d2 with NVIDIA 5090 TI</h1>
          <button className={s.button}>Shop now</button>
        </div>
        <div className={s.image}>
          <img src={BG} alt="" />
        </div>
      </div>
    </section>
  );
}

export default Poster;