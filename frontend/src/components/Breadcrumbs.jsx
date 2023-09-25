import { useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb, index, array) => {
      const isLastOrBeforeLastCrumb =
        index === array.length - 1 || array.length - 2;

      if (isLastOrBeforeLastCrumb && !isNaN(Number(crumb))) {
        return null;
      }

      return (
        <div className="crumb" key={crumb}>
          <span>{crumb.replace(/-/g, " ")}</span>
        </div>
      );
    });

  return <div className="breadcrumbs">{crumbs}</div>;
};

export default Breadcrumbs;
