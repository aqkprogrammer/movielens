// Converts a comma-separated values (CSV) string to a 2D array of objects. The first row of the string is used as the title row.
// Use Array.prototype.indexOf() to find the first newline character (\n).
// Use Array.prototype.slice() to remove the first row (title row) and String.prototype.split() to separate it into values, using the provided delimiter.
// Use String.prototype.split() to create a string for each row.
// Use String.prototype.split() to separate the values in each row, using the provided delimiter.
// Use Array.prototype.reduce() to create an object for each row's values, with the keys parsed from the title row.
// Omit the second argument, delimiter, to use a default delimiter of ,.

export const csvJSON = (data, delimiter = ",") => {
  const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
  let popped = titles.pop();
  let str = popped.replace("\r", "");
  titles.push(str);
  return data
    .slice(data.indexOf("\n") + 1)
    .split("\n")
    .map((v) => {
      const values = v.split(delimiter);
      return titles.reduce(
        (obj, title, index) => ((obj[title] = values[index]), obj),
        {}
      );
    });
};

export const getDate = (stamp) => {
  var date = new Date(stamp * 1000);
  return date.toDateString() === "Invalid Date" ? "-" : date.toDateString();
};

export const getGenres = (data) => {
  return data.split("|");
};

export const getUniqueArr = (arr) => {
  return [...new Set(arr)];
};

export const getDistinctValue = (arr, key) => {
  return [...new Set(arr.map((item) => item[key]))];
};

export const getTop10RatedMovies = (arr, length = 10) => {
  const movieRanks = arr.map((movie) => {
    return movie.rating;
  });
  const highestMovieRank = Math.max(...movieRanks);
  const highestRankedMovies = arr.filter((movie) => {
    return movie.rating === highestMovieRank;
  });
  return highestRankedMovies.slice(0, length);
};
