import { TbTargetArrow } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.topRight}>
        <button style={styles.buttonTop} className="button">
          <FiUser style={styles.userIcon} />
          <span style={styles.loggedInText}>Logged in</span>
        </button>
      </div>
      <header style={styles.header}>
        <h1 style={styles.title}>Budget Buddy</h1>
        <p style={styles.subtitle}>
          Take control of your finances effortlessly
        </p>
      </header>

      <div style={styles.buttonContainer}>
        <a href="/goals" style={styles.link}>
          <button style={styles.button} className="button">
            <TbTargetArrow style={styles.logo} className="icon" />
            <span className="buttonText">Goals</span>
          </button>
        </a>
        <a href="/expenses/transactions" style={styles.link}>
          <button style={styles.button} className="button">
            <RiMoneyDollarCircleLine style={styles.logo} className="icon" />
            <span className="buttonText">Expenses</span>
          </button>
        </a>
      </div>
    </div>
  );
};

// Styling for the page
const styles: { [key: string]: CSSProperties } = {
  container: {
    fontFamily: "'Roboto', sans-serif",
    color: "#333",
    textAlign: "center" as "center",
    padding: "20px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a8d8ff", // Light background color
    position: "relative",
  },
  topRight: {
    position: "absolute",
    top: "20px",
    right: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  buttonTop: {
    backgroundColor: "#0064c9",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    padding: "10px 15px",
    borderRadius: "20px",
  },
  userIcon: {
    fontSize: "24px",
    color: "#fff",
  },
  loggedInText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
  },
  header: {
    marginBottom: "40px",
  },
  title: {
    color: "#0064c9",
    fontSize: "36px",
    fontWeight: "700", // Bold weight
    margin: 0,
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)", // Added shadow
  },
  subtitle: {
    color: "#0064c9",
    fontSize: "18px",
    fontWeight: "500", // Semi-bold weight
    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Added shadow
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#0064c9",
    color: "white",
    padding: "20px 30px",
    fontSize: "18px",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    outline: "none",
    transition: "transform 0.2s ease, background-color 0.2s ease",
  },
  logo: {
    fontSize: "24px",
  },
};

// Adding CSS animations for hover and click using CSS
const cssStyles = `
  .button:hover {
    transform: scale(1.05);
    background-color: #0051a8;
  }

  .button:active {
    transform: scale(0.95);
    background-color: #003d7a;
  }

  .buttonText,
  .icon {
    transition: color 0.3s ease;
  }

  .button:hover .buttonText,
  .button:hover .icon {
    color: black;
  }
`;

// Injecting the CSS styles to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = cssStyles;
document.head.appendChild(styleSheet);

export default Home;
