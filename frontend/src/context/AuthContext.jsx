
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookCard = ({ book, onDelete, onEdit }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleViewDetails = () => {
    navigate(`/book/${book._id}`);
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <p className="card-text">
          <strong>Author:</strong> {book.author}<br />
          <strong>Genre:</strong> {book.genre}<br />
          <strong>Year:</strong> {book.year}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={handleViewDetails}
            className="btn btn-primary btn-sm"
          >
            View Details
          </button>

          {/* Show edit/delete buttons only for admin */}
          {user?.role === "admin" && (
            <div className="admin-actions">
              <button
                onClick={() => onEdit(book._id)}
                className="btn btn-warning btn-sm me-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => onDelete(book._id)}
                className="btn btn-danger btn-sm"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;