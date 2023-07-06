import React, { useState, useEffect } from "react";

function Movieform({ handleAddMovie }) {
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(false);

  const checkDetails = () => {
    if (movieName === "" || rating === "" || duration === "") {
      return;
    }
    const t = duration.slice(-1);
    if (t === "m" || t === "h") {
      const tValue = Number(duration.slice(0, duration.length - 1));
      setError(false);
      if (t === "m") {
        const tInMinutes = tValue / 60;
        const tInHours = (Math.round(tInMinutes * 10) / 10).toFixed(1);
        handleAddMovie(movieName, Number(rating), tInHours);
      } else {
        handleAddMovie(movieName, Number(rating), tValue);
      }
    } else {
      setMovieName("");
      setRating("");
      setDuration("");
      setError(true);
    }
  };

  useEffect(() => {
    if (movieName !== "" || rating !== "" || duration !== "") setError(false);
  }, [movieName, rating, duration]);

  return (
    <section>
      <div className="card pa-30">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="layout-column mb-15">
            <label htmlFor="name" className="mb-3">
              Movie Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter Movie Name"
              data-testid="nameInput"
              value={movieName}
              onChange={(e) => setMovieName(e.target.value)}
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="ratings" className="mb-3">
              Ratings
            </label>
            <input
              type="number"
              id="ratings"
              placeholder="Enter Rating on a scale of 1 to 100"
              data-testid="ratingsInput"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>
          <div className="layout-column mb-30">
            <label htmlFor="duration" className="mb-3">
              Duration
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter duration in hours or minutes"
              data-testid="durationInput"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {error && (
            <div className="alert error mb-30" data-testid="alert">
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div>
          )}
          <div className="layout-row justify-content-end">
            <button
              type="submit"
              className="mx-0"
              data-testid="addButton"
              onClick={checkDetails}
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Movieform;
