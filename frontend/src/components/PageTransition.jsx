import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <div key={location.key} className="page-fade-in">
      {children}
    </div>
  );
};

export default PageTransition;
