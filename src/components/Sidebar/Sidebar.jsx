import { NavLink } from "react-router-dom";
import s from "../../assets/styles/Sidebar.module.css"
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { list } = useSelector(({ categories }) => categories)
  return (
    <section className={s.sidebar}>
      <div className={s.title}>Categoryes</div>
      <nav>
        <ul className={s.menu}>
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}
                to={`/categories/${id}`}>
                {name}
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>
      <div className={s.footer}>
        <a href="/help" target="_blank" rel="noreferrer" className={s.link}>help</a>
        <a href="/terms" target="_blank" rel="noreferrer" className={s.link}>team</a>
      </div>
    </section>
  );
}

export default Sidebar;