import { Link, useNavigate, useParams } from "react-router-dom";
import { yearLabel } from "../data/students.js";

export default function StudentDetail({ students }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find((item) => item.id === id);

  if (!student) {
    return (
      <section>
        <h1>Student not found</h1>
        <p className="lead">
          No student was found with ID <strong>{id}</strong>.
        </p>

        <div className="actions">
          <Link to="/students" className="btn btn-primary">
            Back to students
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h1>Student details</h1>

      <div className="profile">
        <h2>{student.fullName}</h2>

        <dl>
          <dt>Student ID</dt>
          <dd>{student.id}</dd>

          <dt>Email</dt>
          <dd>{student.email}</dd>

          <dt>Course</dt>
          <dd>{student.course}</dd>

          <dt>Year level</dt>
          <dd>{yearLabel(student.yearLevel)}</dd>
        </dl>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => navigate("/students")}
        >
          Back to students
        </button>
      </div>
    </section>
  );
}
