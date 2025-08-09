import React, { useState } from "react";
import "./Feedback.css";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);

  const smileys = ["😡", "😕", "😐", "😊", "😍"];

  return (
    <div className="feedback-container">
      <h3>Rate Your Experience</h3>
      <div className="smiley-rating">
        {smileys.map((smiley, index) => {
          const ratingValue = index + 1;
          return (
            <span
              key={index}
              className={`smiley ${ratingValue <= (hover || rating) ? "active" : ""}`}
              onClick={() => setRating(ratingValue)}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            >
              {smiley}
            </span>
          );
        })}
      </div>
      <textarea placeholder="Leave your feedback here..." />
      <button>Submit</button>
    </div>
  );
};

export default Feedback;
