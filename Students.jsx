import { Link } from "react-router-dom";
import { yearLabel } from "../data/students.js";

export default function Students({ students }) {
  return (
    <section>
      <h1>Students</h1>
      <p className="lead">
        {students.length} registered. Select a name to see the details.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Student ID</th>
              <th scope="col">Name</th>
              <th scope="col">Course</th>
              <th scope="col">Year</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="id">{student.id}</td>
                <td>
                  <Link to={`/students/${student.id}`}>
                    {student.fullName}
                  </Link>
                </td>
                <td>{student.course}</td>
                <td>{yearLabel(student.yearLevel)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
