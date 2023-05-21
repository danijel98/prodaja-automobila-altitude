import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Cars.module.css";

export default function CarItem(props: any) {
  const { car, changeActive, setChangeActive } = props;
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleClick = () => {
    if (linkRef.current) {
      linkRef.current.click();
    }
  };

  return (
    <tr key={car.id} onClick={handleClick} className={styles.link}>
      <td>
        <Link to={`/cars/${car.id}`} ref={linkRef} style={{ display: "none" }}>
          {car.id}
        </Link>
        {car.id}
      </td>
      <td>{car.manufacturer}</td>
      <td>{car.model}</td>
      <td>{car.transmission}</td>
      <td>{car.fuel}</td>
      <td>{car.type}</td>
      <td>{car.price}</td>
      <td className={styles.hover}>{car.active.toString()}</td>
    </tr>
  );
}
