import { deleteExpense } from "../../Store/Slices/ExpenseSliceThunk";
import { setExpenseToEdit } from "../../Store/Slices/ExpenseSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Card from "../../UI/Card";
import { Col, Row } from "react-bootstrap";

const ExpenseListing = ({ exp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteHandler = async (exp_id) => {
    try {
      await dispatch(deleteExpense(exp_id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
    }
  };

  const editHandler = (exp) => {
    dispatch(setExpenseToEdit(exp));
    navigate("/addExpense");
  };

  const dateObj = new Date(exp.date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("default", { month: "short" });
  const year = dateObj.getFullYear();

  return (
    <Card className="mx-5 my-3">
      <Row className="d-flex flex-wrap align-items-center mx-2 my-3">
        <Col className="col-3">
          <Card className="row m-2 ">
            <div>
              <div className="">{day}</div>
              <div> {month} </div>
              <div className="fw-bold fs-5">{year}</div>
            </div>
          </Card>
        </Col>
        <Col className="m-2">
          <Card className="row mt-2 align-items-center">
            <div className="col-4 text-start fs-3">${exp.amount}</div>
            <div className="col-7">
              <div className="fw-bold fs-5">{exp.category}</div>
              <div>{exp.description}</div>
            </div>
          </Card>
        </Col>
        <Col className="col-3 m-2">
          <div className="btn-group" role="group">
            <button
              onClick={() => editHandler(exp)}
              className="btn btn-secondary mt-4"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(exp.id)}
              className="btn btn-secondary mt-4"
            >
              Delete
            </button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default ExpenseListing;
