import { deleteExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { setExpenseToEdit } from "../../Store/Slices/ExpenseSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Col, Row } from "react-bootstrap";
import "./ExpenseListing.css";

const ExpenseListing = ({ exp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await dispatch(deleteExpense(exp.id));
      console.log("Expense Deleted successfully!");
    } catch (err) {
      console.error("Failed to delete expense:", err.message);
    }
  };

  const handleEdit = () => {
    dispatch(setExpenseToEdit(exp));
    navigate("/addExpense");
  };

  const dateObj = new Date(exp.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("default", { month: "short" });
  const year = dateObj.getFullYear();

  return (
    <Row className="expense-item align-items-center p-3 m-2">
      <Col md={3}>
        <div className="date-box text-center p-3">
          <div className="fs-4">{day}</div>
          <div>{month}</div>
          <div className="fw-bold fs-5">{year}</div>
        </div>
      </Col>

      <Col md={6} className="d-flex justify-content-center ">
        <div className="expense-info p-3">
          <div className="row">
            <div className="col-7">
              <div className="fw-bold fs-5">{exp.category}</div>
              <div>{exp.description}</div>
            </div>
            <div className="col-5 fs-3">${exp.amount}</div>
          </div>
        </div>
      </Col>

      <Col md={3} className="d-flex justify-content-center ">
        <div className="button-group">
          <button onClick={handleEdit} className="btn btn-secondary">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-secondary">
            Delete
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default ExpenseListing;
