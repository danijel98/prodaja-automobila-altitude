import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./CarDetails.module.css";
import { carService } from "../../../redux/services/car/carService";
import { Car } from "../../../model/Car";
import { decode } from "base-64";
import NavBar from "../../navigation/Nav";
import { confirmAlert } from "react-confirm-alert";
import "./confirmAlert.css";

export default function CarDetails() {
  const [car, setCar] = useState<Car>({
    manufacturer: "",
    model: "",
    picture: "",
    transmission: "",
    fuel: "",
    type: "",
    price: 0,
    id: "",
    active: false,
  });
  const { carId } = useParams();
  const navigate = useNavigate();

  const uloga = localStorage.getItem("role");

  useEffect(() => {
    getCar();
  }, [carId]);

  const getCar = async () => {
    await carService.get(carId as string).then((response: any) => {
      if (!response.error) {
        const decodedData = JSON.parse(decode(response.data.data));
        setCar(decodedData);
      }
    });
  };

  const goBack = () => {
    navigate("/cars");
  };

  const handleDelete = async (id: string) => {
    await carService.delete(id).then(() => goBack());
  };

  const customUI = (id: string) => {
    confirmAlert({
      title: "Delete car",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => undefined,
        },
      ],
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const transformedData = {
      data: {
        id: car.id,
        manufacturer: car.manufacturer,
        model: car.model,
        picture: car.picture,
        transmission: car.transmission,
        fuel: car.fuel,
        type: car.type,
        price: Number(car.price),
        active: true,
      },
    };
    await carService.update(transformedData).then((response: any) => {
      if (!response.error) {
        goBack();
      }
    });
  };

  if (!car) {
    return <div>Loading...</div>;
  }

  const isEditable = uloga === "admin";

  return (
    <>
      <NavBar />
      <div className={styles.CarDetails}>
        <h2 className={styles.CarDetailsHeading}>Car Details</h2>
        <div className={styles.CarDetailsContainer}>
          <img src={car.picture} alt="Car" className={styles.CarDetailsImage} />
          <div className={styles.CarDetailsInfo}>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Manufacturer:</span>
              <input
                type="text"
                name="manufacturer"
                value={car.manufacturer}
                readOnly={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              />
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Model:</span>
              <input
                type="text"
                name="model"
                value={car.model}
                readOnly={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              />
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Transmission:</span>
              <select
                name="transmission"
                value={car.transmission}
                disabled={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Fuel:</span>
              <select
                name="fuel"
                value={car.fuel}
                disabled={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="gas">Gas</option>
                <option value="electric">Electric</option>
              </select>
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Type:</span>
              <select
                name="type"
                value={car.type}
                disabled={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              >
                <option value="hatchback">Hatchback</option>
                <option value="limousine">Limousine</option>
                <option value="caravan">Caravan</option>
                <option value="SUV">SUV</option>
              </select>
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Picture:</span>
              <input
                type="text"
                name="type"
                value={car.picture}
                readOnly={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              />
            </div>
            <div className={styles.CarDetailsItem}>
              <span className={styles.CarDetailsLabel}>Price:</span>
              <input
                type="number"
                name="price"
                value={car.price}
                readOnly={!isEditable}
                onChange={handleInputChange}
                className={styles.CarDetailsValue}
              />
            </div>
          </div>
        </div>
        <div className={styles.CarDetailsButtonContainer}>
          <button onClick={goBack} className={styles.CarDetailsBack}>
            Go back
          </button>
          {isEditable && (
            <>
              <button
                onClick={handleUpdate}
                className={styles.CarDetailsUpdate}
              >
                Update
              </button>
              <button
                onClick={() => customUI(car.id)}
                className={styles.CarDetailsDelete}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
