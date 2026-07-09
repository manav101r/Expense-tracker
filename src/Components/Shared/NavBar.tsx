import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  rightside?: ReactNode;
}

function NavBar({ rightside }: Props) {
  return (
    <nav
      className="navbar bg-primary navbar-expand-lg fixed-top"
      data-bs-theme="dark"
      style={{ width: "100%" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Budget Buddy
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="flex-grow-1 justify-content-around mb-2 mb-lg-0 navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/Goals">
                Goals
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Expenses/transactions"
              >
                Expenses
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Bills
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Spending Insights
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Rewards
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <span className="navbar-text">{rightside}</span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
