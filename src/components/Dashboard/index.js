import React, { useContext } from "react";
import { getUniqueArr } from "../../common/Utility";
import { AppContext } from "../../App";
import { Container, Row, Col, Form } from "react-bootstrap";
import Loader from "../Loader";
import TopRatedMovies from "./TopRatedMovies";
import Chart from "./Chart";
import "./index.scss";

const Dashboard = () => {
  const {
    top10Movies,
    genres,
    top10RomanticMovies,
    top10ActionMovies,
    moviesData,
    // tagsData,
    handleChange,
    filterValue,
    sortValue,
  } = useContext(AppContext);
  //   console.log("unique", getDistinctValue(tagsData, "tag"));
  let genresArr = [];
  genres.map((genre) => {
    let movies = moviesData.filter((movie) => {
      return movie.genres.includes(genre);
    });
    genresArr.push({ name: genre, count: movies.length });
  });

  //   let tagsArr = [];
  //   tagsData.map((tag) => {
  //     let movies = moviesData.filter((movie) => {
  //         console.log("movie", tag)
  //       return movie?.tag?.includes(tag);
  //     });
  //     tagsArr.push({ name: tag, count: movies.length });
  //   });
  //   tagsData.map((tag) => {
  //     let movies = moviesData.filter((movie) => {
  //       console.log("movie", movie);
  //       movie?.tag?.find((item) => {
  //         return movie.genres.includes(genre);
  //         return item.tag === tag;
  //       });
  //       return;
  //     });
  //     tagsArr.push({ name: tag, count: movies.length });
  //     return false;
  //   });
  //   console.log("tagsArr", tagsArr);

  // Array.prototype.sortBy = function(p) {
  //   return this.slice(0).sort(function(a,b) {
  //     return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
  //   });
  // }

  genresArr.sort((a, b) => {
    return b.count - a.count;
  });

  let barChart = {
    series: [
      {
        data: genresArr.map((d) => d.count).slice(0, 10),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      title: {
        text: "Popular Genres",
        align: "left",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: genresArr.map((d) => d.name).slice(0, 10),
      },
    },
  };

  let lineChart = {
    series: [
      {
        data: moviesData.map((d) => d.rating).slice(0, 40),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Rating Count",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: moviesData.map((d) => d.totalRatingCount).slice(0, 40),
      },
    },
  };

  let pieChart = {
    options: {
      labels: top10RomanticMovies.map((d) => d.title).slice(0, 10),
      title: {
        text: "Top 10 Romantic Movies",
        align: "left",
      },
    },
    series: [44, 55, 41, 17, 99, 12, 43, 10, 20, 44],
  };
  let donutChart = {
    options: {
      labels: top10ActionMovies.map((d) => d.title).slice(0, 10),
      title: {
        text: "Top 10 Action Movies",
        align: "left",
      },
    },
    series: [44, 55, 41, 17, 99, 12, 43, 10, 20, 44],
  };

  let chartArr = [
    {
      options: pieChart.options,
      series: pieChart.series,
      type: "pie",
      width: "550",
    },
    {
      options: donutChart.options,
      series: donutChart.series,
      type: "donut",
      width: "550",
    },
    {
      options: barChart.options,
      series: barChart.series,
      type: "bar",
      width: "550",
    },
    {
      options: lineChart.options,
      series: lineChart.series,
      type: "line",
      width: "550",
    },
  ];

  return (
    <Container>
      {top10Movies.length === 0 && <Loader />}
      {top10Movies.length > 0 && (
        <>
          <Row>
            {chartArr.map((chart, index) => (
              <Col key={index}>
                <Chart
                  options={chart.options}
                  series={chart.series}
                  type={chart.type}
                  width={chart.width}
                />
              </Col>
            ))}
          </Row>
          <Row className="rated-filter">
            <Col sm={6}>
              <h5>Trending Top {filterValue} Rated Movies</h5>{" "}
            </Col>
            <Col sm={2}>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e, "sort")}
                value={sortValue}
              >
                <option value="">Sort By</option>
                <option value="ASC">ASC</option>
                <option value="DESC">DESC</option>
              </Form.Select>
            </Col>
            <Col sm={4}>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => handleChange(e, "select")}
                value={filterValue}
              >
                <option value="">Select Filter</option>
                <option value="10">Trending Top 10</option>
                <option value="20">Trending Top 20</option>
                <option value="30">Trending Top 30</option>
                <option value="40">Trending Top 40</option>
                <option value="50">Trending Top 50</option>
                <option value="100">Trending Top 100</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <TopRatedMovies />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
