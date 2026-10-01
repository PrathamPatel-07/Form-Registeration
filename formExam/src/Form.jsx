import { useEffect, useState } from "react";
import "./Form.css";

function Form() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [savedData, setSavedData] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessage] = useState("");

  // Load saved details when the page opens
  useEffect(() => {
    const storedData = localStorage.getItem("studentInfo");

    if (storedData) {
      setSavedData(JSON.parse(storedData));
    }
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Save details in local storage
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { ...form };

    localStorage.setItem("studentInfo", JSON.stringify(userData));
    setSavedData(userData);
    setShowDetails(false);
    setMessage("Registration details saved successfully!");

    setForm({
      name: "",
      email: "",
      password: "",
      contact: "",
    });
  };

  // Display saved details
  const handleView = () => {
    const storedData = localStorage.getItem("studentInfo");

    if (storedData) {
      setSavedData(JSON.parse(storedData));
      setShowDetails(true);
      setMessage("");
    } else {
      setMessage("No registration details found.");
      setShowDetails(false);
    }
  };

  return (
    <div className="page">
      <section className="welcome-panel">
        <div className="brand">
          <div className="brand-icon">R</div>
          <span>Register Desk</span>
        </div>

        <div className="welcome-content">
          <p className="small-heading">WELCOME</p>
          <h1>Get started with your registration.</h1>
          <p className="welcome-text">
            Fill in your details to create your registration
            record. You can view your saved information
            whenever you need it.
          </p>
        </div>

        <div className="welcome-footer">
          Simple registration • Easy access
        </div>
      </section>

      <main className="form-section">
        <div className="registration">
          <div className="form-heading">
            <p className="eyebrow">NEW REGISTRATION</p>
            <h2>Personal details</h2>
            <p>Enter the information requested below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Rahul Patel"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="field">
              <label htmlFor="contact">Contact number</label>
              <input
                id="contact"
                type="tel"
                name="contact"
                placeholder="10-digit mobile number"
                value={form.contact}
                onChange={handleChange}
                pattern="[0-9]{10}"
                title="Enter a 10-digit mobile number"
                required
              />
            </div>

            <button className="save-button" type="submit">
              Save details
            </button>
          </form>

          <div className="view-area">
            <button
              className="view-button"
              type="button"
              onClick={handleView}
            >
              View saved details
            </button>
          </div>

          {message && (
            <p className="message" role="status">
              {message}
            </p>
          )}

          {showDetails && savedData && (
            <div className="details">
              <div className="details-heading">
                <h3>Saved information</h3>
                <span>Stored locally</span>
              </div>

              <div className="detail-row">
                <span>Name</span>
                <strong>{savedData.name}</strong>
              </div>

              <div className="detail-row">
                <span>Email</span>
                <strong>{savedData.email}</strong>
              </div>

              <div className="detail-row">
                <span>Password</span>
                <strong>{"•".repeat(savedData.password.length)}</strong>
              </div>

              <div className="detail-row">
                <span>Contact</span>
                <strong>{savedData.contact}</strong>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Form;