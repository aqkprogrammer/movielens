import React, {
  useEffect,
  useLayoutEffect,
  useState,
  createContext,
} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  csvJSON,
  getGenres,
  getTop10RatedMovies,
  getUniqueArr,
} from "./common/Utility";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Movies from "./components/Movies";

export const AppContext = createContext(null);

function App() {
  const [moviesData, setMoviesData] = useState([]);
  // const [linksData, setLinksData] = useState([]);
  const [ratingsData, setRatingsData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [top10Movies, setTop10Movies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoader, setLoader] = useState(false);
  const [top10RomanticMovies, setTop10RomanticMovies] = useState([]);
  const [top10ActionMovies, setTop10ActionMovies] = useState([]);
  const [filterValue, setFilterValue] = useState(10);
  const [sortValue, setSortValue] = useState("ASC");
  const [searchValue, setSearchValue] = useState("");

  useLayoutEffect(() => {
    setLoader(true);
    getMovies();
    // getLinks();
    getRatings();
    getTags();
    setLoader(false);
  }, []);

  const getMovies = () => {
    (async () => {
      await fetch(`data/movies.csv`)
        .then((r) => r.text())
        .then((text) => {
          let jsonData = csvJSON(text);
          const slicedArray = jsonData.slice(0, 3000);
          setMoviesData(slicedArray);
          // setMoviesData(jsonData);
        });
    })();
  };

  // const getLinks = () => {
  //   (async () => {
  //     await fetch(`data/links.csv`)
  //       .then((r) => r.text())
  //       .then((text) => {
  //         let jsonData = csvJSON(text);
  //         setLinksData(jsonData);
  //       });
  //   })();
  // };

  const getRatings = () => {
    (async () => {
      await fetch(`data/ratings.csv`)
        .then((r) => r.text())
        .then((text) => {
          let jsonData = csvJSON(text);
          setRatingsData(jsonData);
        });
    })();
  };

  const getTags = () => {
    (async () => {
      await fetch(`data/tags.csv`)
        .then((r) => r.text())
        .then((text) => {
          let jsonData = csvJSON(text);
          setTagsData(jsonData);
        });
    })();
  };

  useEffect(() => {
    moviesWithTagsAndRating();
    setTop10Movies(getTop10RatedMovies(moviesData, 10));
    getTop10RomanticMovies();
    getTop10ActionMovies();
  }, [moviesData, tagsData, ratingsData]);

  const moviesWithTagsAndRating = () => {
    if (
      moviesData.length > 0 &&
      tagsData.length > 0 &&
      ratingsData.length > 0
    ) {
      let genresArr = [];
      moviesData.forEach((movie, index) => {
        getGenres(movie?.genres)?.map((item) => {
          let str = item.replace("\r", "");
          str = str.replace(" ", "");
          str = str.replace('"', "");
          genresArr.push(str);
        });
        let tagStr = [];
        tagsData.filter((el) => {
          if (el.movieId === movie.movieId) {
            tagStr.push(el.tag);
          }
        });
        moviesData[index].tag = getUniqueArr(tagStr);
        let ratingStr = [];
        let rating = ratingsData.filter((el) => {
          if (el.movieId === movie.movieId) {
            ratingStr.push(Number(el.rating));
            return el.rating;
          }
        });
        moviesData[index].totalRatingCount = rating.length;
        let sum = ratingStr.reduce((a, b) => a + b, 0); //get sum of all elements in array
        moviesData[index].rating = Math.round(sum / ratingStr.length || 0); //get average of all elements in array ;)
      });
      // console.log("unique", getDistinctValue(tagsData, "tag"));
      setGenres(getUniqueArr(genresArr));
    }
  };

  const getTop10RomanticMovies = () => {
    let romanticMovies = [];
    moviesData.map((movie) => {
      if (movie?.genres?.includes("Romance")) {
        romanticMovies.push(movie);
      }
    });
    setTop10RomanticMovies(getTop10RatedMovies(romanticMovies));
  };

  const getTop10ActionMovies = () => {
    let actionMovies = [];
    moviesData.map((movie) => {
      if (movie?.genres?.includes("Action")) {
        actionMovies.push(movie);
      }
    });
    setTop10ActionMovies(getTop10RatedMovies(actionMovies));
  };

  const handleChange = (e, type) => {
    if (type === "select") {
      setFilterValue(e.target.value);
      setSortValue("ASC");
      setTop10Movies(getTop10RatedMovies(moviesData, e.target.value));
    } else {
      setSortValue(e.target.value);
      let data = getTop10RatedMovies(moviesData, filterValue);
      if (e.target.value === "ASC") {
        setTop10Movies(data.sort());
      } else {
        setTop10Movies(data.reverse());
      }
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchClick = (type) => {
    if (type === "Reset") {
      setSearchValue("");
      getMovies();
    } else {
      let data = moviesData.filter((movie) => {
        return movie.title.includes(searchValue);
      });
      if (data.length === 0) {
        data = moviesData.filter((movie) => {
          return movie.genres.includes(searchValue);
        });
      }
      if (data.length === 0) {
        data = moviesData.filter((movie) => {
          return movie.tag.includes(searchValue);
        });
      }
      setMoviesData(data);
    }
  };

  return (
    <>
      {isLoader && <Loader />}
      {!isLoader && (
        <>
          <Router>
            <Header />
            <AppContext.Provider
              value={{
                moviesData,
                top10Movies,
                genres,
                top10RomanticMovies,
                top10ActionMovies,
                tagsData,
                handleChange,
                filterValue,
                sortValue,
                searchValue,
                handleSearch,
                searchClick,
              }}
            >
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route path="/movies" element={<Movies />} />
              </Routes>
            </AppContext.Provider>
          </Router>
        </>
      )}
    </>
  );
}

export default App;
