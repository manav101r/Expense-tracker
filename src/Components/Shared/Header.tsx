

const Header = ({ headerName }: { headerName: string }) => {
  return (
    <h1 
      className="display-4 header" 
      style={{ color: "Highlight", textAlign: "center", fontWeight: "bold", paddingTop: "4rem" }}
    >
      {headerName}
    </h1>
  );
};

export default Header;
