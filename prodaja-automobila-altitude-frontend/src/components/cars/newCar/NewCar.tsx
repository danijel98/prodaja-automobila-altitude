import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./NewCar.module.css";
import { Car } from "../../../model/Car";
import { carService } from "../../../redux/services/car/carService";

interface FormData extends Car {}

export default function NewCar(props: {
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { modalIsOpen, setModalIsOpen, updated, setUpdated } = props;
  const initialFormData: FormData = {
    id: "",
    active: false,
    manufacturer: "",
    model: "",
    picture: "",
    transmission: "",
    fuel: "",
    type: "",
    price: 0,
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createNewCar = async (formData: any) => {
    await carService.create(formData).then((response: any) => {
      if (!response.error) {
        setUpdated(!updated);
      }
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const transformedData = {
      data: {
        id: formData.id,
        manufacturer: formData.manufacturer,
        model: formData.model,
        picture: formData.picture,
        transmission: formData.transmission,
        fuel: formData.fuel,
        type: formData.type,
        price: Number(formData.price),
      },
    };
    createNewCar(transformedData);
    setFormData(initialFormData);
    setModalIsOpen(false);
  };

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="New Car Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <h2>Add New Car</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Manufacturer:</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Model:</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Picture:</label>
            <input
              type="text"
              name="picture"
              value={formData.picture}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Transmission:</label>
            <select
              name="transmission"
              value={formData.transmission}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Fuel:</label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="gas">Gas</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Type:</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={styles.input}
            >
              <option value="hatchback">Hatchback</option>
              <option value="limousine">Limousine</option>
              <option value="caravan">Caravan</option>
              <option value="SUV">SUV</option>
            </select>
          </div>
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={styles.input}
            />
          </div>
          <div className={styles.btnSubmitContainer}>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
