import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import styles from "./Nav.module.css";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uloga = localStorage.getItem("role");

  const isGuest = uloga === "guest";

  const handleLogout = async () => {
    dispatch(logout() as any) as any;
    navigate("/login");
  };

  return (
    <div className={`${styles.menu}`}>
      <div className={styles.menuSection1}>
        <span className={styles.menuItem}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
          >
            {"Home"}
          </NavLink>
        </span>
      </div>

      {!isGuest && (
        <div className={styles.menuSection2}>
          <span className={styles.menuItem}>
            <NavLink
              to="/cars"
              className={({ isActive }) =>
                isActive ? styles.navLinkActive : styles.navLink
              }
            >
              Cars
            </NavLink>
          </span>
        </div>
      )}
      <div className={styles.menuSection3}>
        <div className={styles.submitBtnContainer}>
          <button
            name="action"
            value="login"
            type="button"
            className={styles.btnSubmit}
            onClick={() => handleLogout()}
          >
            <p className={styles.txtSubmit}>{"Logout"}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
