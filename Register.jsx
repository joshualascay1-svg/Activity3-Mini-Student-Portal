import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { COURSES, YEAR_LEVELS, yearLabel } from "../data/students.js";
import { validate } from "../utils/validate.js";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    studentId: "",
    email: "",
    course: "",
    yearLevel: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newStudent = {
      id: form.studentId.trim(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      course: form.course,
      yearLevel: form.yearLevel,
    };

    onRegister(newStudent);
    navigate("/students");
  }

  return (
    <section>
      <h1>Register a student</h1>
      <p className="lead">All fields are required.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            className={errors.fullName ? "invalid" : ""}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <small id="fullName-error" className="error">
              {errors.fullName}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="studentId">Student ID</label>
          <input
            id="studentId"
            name="studentId"
            type="text"
            placeholder="2024-0123"
            value={form.studentId}
            onChange={handleChange}
            className={errors.studentId ? "invalid" : ""}
            aria-invalid={Boolean(errors.studentId)}
            aria-describedby={errors.studentId ? "studentId-error" : undefined}
          />
          <p className="hint">Format: four digits, a dash, four digits.</p>
          {errors.studentId && (
            <small id="studentId-error" className="error">
              {errors.studentId}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : ""}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <small id="email-error" className="error">
              {errors.email}
            </small>
          )}
        </div>

        <div className="field">
          <label htmlFor="course">Course</label>
          <select
            id="course"
            name="course"
            value={form.course}
            onChange={handleChange}
            className={errors.course ? "invalid" : ""}
            aria-invalid={Boolean(errors.course)}
            aria-describedby={errors.course ? "course-error" : undefined}
          >
            <option value="">Choose a course</option>
            {COURSES.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
          {errors.course && (
            <small id="course-error" className="error">
              {errors.course}
            </small>
          )}
        </div>

        <div className="field">
          <fieldset>
            <legend>Year level</legend>

            <div className="radio-group">
              {YEAR_LEVELS.map((year) => (
                <label key={year}>
                  <input
                    type="radio"
                    name="yearLevel"
                    value={year}
                    checked={form.yearLevel === year}
                    onChange={handleChange}
                  />
                  {yearLabel(year)}
                </label>
              ))}
            </div>

            {errors.yearLevel && (
              <small id="yearLevel-error" className="error">
                {errors.yearLevel}
              </small>
            )}
          </fieldset>
        </div>

        <button type="submit" className="btn btn-primary">
          Register student
        </button>
      </form>
    </section>
  );
}
