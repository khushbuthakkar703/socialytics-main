import React from "react";
import Pagination from "react-js-pagination";
import Select from "react-select";
import { Button, Col, Row } from "reactstrap";
import "../../../assets/scss/custom.scss";

const CustomTable = (props: any) => {
  const Show = [
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        {props?.isFilterByPlan ? (
          <div className="search-box me-2 d-inline-block">
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search plan name"
                onChange={(e) => props.getFilterValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          ""
        )}

        {props?.isSearch ? (
          <div className="search-box me-2 d-inline-block">
            <div className="table-search">
              <i className="bx bx-search-alt search-icon" />
              <input
                placeholder="Search"
                className="form-control"
                onChange={(e) => {
                  setTimeout(() => props.getSearchValue(e.target.value), 1000);
                }}
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {props?.isButton ? (
          <Button color="info" onClick={props.clickOnButton}>
            {props?.isButton}
          </Button>
        ) : (
          ""
        )}
        {props?.isField ? <div>{props?.field}</div> : ""}
      </div>
      <div className="table-responsive data-table rounded-lg p-0">
        <table className="align-items-center table-striped mb-0 table">
          {/* column headers */}
          <thead className="table-head">
            <tr>{props?.columnHeaders}</tr>
          </thead>

          {/* table body */}
          <tbody>{props?.dataRows}</tbody>
        </table>
        {props?.totalCount === 0 && (
          <div className="d-flex justify-content-center mt-4">
            <p>No Data Found</p>
          </div>
        )}
      </div>
      {props?.isPerPageChange ? (
        <div className="search-box d-inline-block table-filter">
          <Select
            className="React"
            classNamePrefix="select"
            defaultValue={Show[0]}
            name="color"
            options={Show}
            onChange={(e) => props?.handlePerPageChangeValue(e?.value)}
          />
        </div>
      ) : (
        ""
      )}
      <Row className="align-items-md-center mt-2">
        <Col className="pagination pagination-rounded justify-content-end mb-2">
          <Pagination
            hideFirstLastPages={true}
            activePage={props?.pageNumber}
            totalItemsCount={props?.totalCount}
            itemsCountPerPage={props?.perPage}
            pageRangeDisplayed={5}
            itemClass="page-item"
            hideDisabled
            linkClass="page-link"
            onChange={props?.handlePageChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default CustomTable;
