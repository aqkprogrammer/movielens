import { Row, Container, Col, Form, Button } from "react-bootstrap";
import { AppContext } from "../../App";
import React, { useContext } from "react";
import "./index.scss";
import MoviesList from "../MoviesList";
// import Loader from "../Loader";

const Movies = () => {
  const { moviesData, searchValue, handleSearch, searchClick } =
    useContext(AppContext);

  return (
    <Row>
      {/* {moviesData.length === 0 && <Loader />} */}
      {/* {moviesData.length > 0 && ( */}
      <Container>
        <Row className="rated-filter">
          <Col sm={7}>
            <h4>Movies List</h4>
          </Col>
          <Col sm={3}>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => handleSearch(e)}
            />
          </Col>
          <Col sm={2}>
            <Button
              variant="primary"
              type="button"
              onClick={() => searchClick("Search")}
            >
              Search
            </Button>&nbsp;&nbsp;
            <Button
              variant="danger"
              type="button"
              onClick={() => searchClick("Reset")}
            >
              Reset
            </Button>
          </Col>
        </Row>
        <MoviesList data={moviesData} />
      </Container>
      {/* )} */}
    </Row>
  );
};

export default Movies;
