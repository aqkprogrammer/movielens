import { Table } from "react-bootstrap";
import RatingStars from "../Rating/RatingStars";
import { getGenres } from "../../common/Utility";

const MoviesList = (props) => {
  const { data } = props;
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>S.No.</th>
          <th>Title</th>
          <th>Genre</th>
          <th>Tag</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={item.movieId}>
              <td>{++index}</td>
              <td width={300}>{item.title}</td>
              <td width={500}>
                {getGenres(item?.genres)
                  ?.map((item) => `${item}`)
                  .join(", ")}
              </td>
              <td>{item?.tag?.map((item) => `${item}`).join(", ")}</td>
              <td>
                {/* {item.rating} */}
                <RatingStars rating={Number(item.rating)} />
              </td>
            </tr>
          ))}
        {data.length === 0 && (
          <tr>
            <td colSpan="5" align="center">
              No Data Found.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default MoviesList;
