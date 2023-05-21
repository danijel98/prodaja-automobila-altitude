import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import stylesPagination from "../pagination/Pagination.module.css";
import styles from "./Cars.module.css";
import { Form, Table } from "react-bootstrap";
import { Car } from "../../model/Car";
import { carService } from "../../redux/services/car/carService";
import CarItem from "./CarItem";
import { decode } from "base-64";

function CarsList(props: { updated: boolean }) {
  const { updated } = props;
  const [cars, setCars] = useState<Car[]>([]);
  const [changeActive, setChangeActive] = useState(false);

  const [numberPerPage, setNumberPerPage] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(numberPerPage);
  const [numberOfElements, setNumberOfElements] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (page >= 0 || page <= totalPages - 1) {
      getCars();
    }
  }, [page]);

  useEffect(() => {
    carService.getByPage(0, numberPerPage).then((response: any) => {
      setNumberOfElements(response.data.total);
      const decodedData = JSON.parse(decode(response.data.data));
      setCars([...decodedData]);
      let totalPages_pre = (response.data.total / numberPerPage) >> 0;
      let totalPages =
        response.data.total % numberPerPage === 0
          ? totalPages_pre
          : totalPages_pre + 1;
      setTotalPages(Number(totalPages));
    });
  }, [numberPerPage]);

  useEffect(() => {
    getCars();
  }, [updated]);

  const getCars = async () => {
    if(numberPerPage===0) {
      await carService.getAll().then((response: any) => {
        if (!response.error) {
          setNumberOfElements(response.data.total);
          const decodedData = JSON.parse(decode(response.data.data));
          setCars([...decodedData]);
          let totalPages_pre = (response.data.total / numberPerPage) >> 0;
          let totalPages =
            response.data.total % numberPerPage === 0
              ? totalPages_pre
              : totalPages_pre + 1;
          setTotalPages(Number(totalPages));
        }
      });
    }else{
      await carService.getByPage(offset, limit).then((response: any) => {
        if (!response.error) {
          setNumberOfElements(response.data.total);
          const decodedData = JSON.parse(decode(response.data.data));
          setCars([...decodedData]);
          let totalPages_pre = (response.data.total / numberPerPage) >> 0;
          let totalPages =
            response.data.total % numberPerPage === 0
              ? totalPages_pre
              : totalPages_pre + 1;
          setTotalPages(Number(totalPages));
        }
      });
    }
  };

  const handlePageChange = (e: any) => {
    setPage(e.selected);
    setOffset(e.selected * numberPerPage);
    setLimit(
      e.selected * numberPerPage + numberPerPage < numberOfElements
        ? e.selected * numberPerPage + numberPerPage
        : numberOfElements
    );
  };

  const handlePageSizeChange = (event: any) => {
    const newSize = parseInt(event.target.value);
    setNumberPerPage(newSize);
    setOffset(0);
    setLimit(numberPerPage);
    setPage(0);
  };

  return (
    <>
      <div className={styles.tableRow}>
        <Table bordered hover className={styles.table}>
          <thead>
            <tr>
              <th className="th-border">{"Id"}</th>
              <th className="th-border">{"Manufacturer"}</th>
              <th className="th-border">{"Model"}</th>
              <th className="th-border">{"Transmission"}</th>
              <th className="th-border">{"Fuel"}</th>
              <th className="th-border">{"Type"}</th>
              <th className="th-border">{"Price"}</th>
              <th className="th-border">{"Active"}</th>
            </tr>
          </thead>
          {cars.length > 0 && (
            <tbody>
              {cars.map((car: Car) => (
                <CarItem
                  car={car}
                  key={car.id}
                  setChangeActive={setChangeActive}
                  changeActive={changeActive}
                />
              ))}
            </tbody>
          )}
        </Table>
      </div>

      <div className={styles.paginationMainContainer}>
        <div className={styles.paginationInfo}>
          Total Elements: {numberOfElements}
        </div>
        <div className={stylesPagination.paginationContainer}>
          <ReactPaginate
            forcePage={page}
            containerClassName={stylesPagination.pagination}
            pageClassName={stylesPagination.page}
            activeClassName={stylesPagination.activePage}
            previousLinkClassName={
              page <= 0
                ? stylesPagination.previousNextPageDisabled
                : stylesPagination.previousNextPage
            }
            nextLinkClassName={
              page >= totalPages - 1
                ? stylesPagination.previousNextPageDisabled
                : stylesPagination.previousNextPage
            }
            breakLabel="..."
            nextLabel={
              totalPages === 0 ? null : (
                <KeyboardArrowRightIcon
                  style={{
                    width: "1.1em",
                    height: "1.1em",
                    color: "black",
                  }}
                />
              )
            }
            onPageChange={handlePageChange}
            marginPagesDisplayed={1}
            pageRangeDisplayed={4}
            pageCount={totalPages}
            previousLabel={
              totalPages === 0 ? null : (
                <KeyboardArrowLeftIcon
                  style={{
                    width: "1.1em",
                    height: "1.1em",
                    color: "black",
                  }}
                />
              )
            }
          />
        </div>
        <div className={styles.paginationInfo}>
          <div className="pagination-options">
            <Form.Select value={numberPerPage} onChange={handlePageSizeChange}>
              <option value={0}>All</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
        </div>
      </div>
    </>
  );
}

export default CarsList;
