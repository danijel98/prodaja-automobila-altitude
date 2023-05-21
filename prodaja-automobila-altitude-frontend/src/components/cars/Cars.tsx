import React, { useEffect, useRef, useState } from "react";
import NavBar from "../navigation/Nav";
import { useNavigate } from "react-router-dom";
import CarsList from "./CarsList";
import styles from "./Cars.module.css";
import NewCar from "./newCar/NewCar";

function Cars() {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updated, setUpdated] = useState(false);

  const handleShow = () => setIsOpen(true);

  const uloga = localStorage.getItem("role");
  const isEditable = uloga === "admin";

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div style={{ width: "90%", marginTop: "2vh" }}>
        {isEditable && (
          <div className={styles.createNewCarContainer}>
            <button className={styles.createNewCar} onClick={handleShow}>
              Create new car
            </button>
          </div>
        )}
        <CarsList updated={updated} />
      </div>
      <NewCar
        updated={updated}
        setUpdated={setUpdated}
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setIsOpen}
      />
    </div>
  );
}

export default Cars;
