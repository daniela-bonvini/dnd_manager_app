import { Loader } from "lucide-react";
function Spinner() {
  return (
    <span className="loading-indicator">
      <Loader className="loading-icon" />
      Loading...
    </span>
  );
}

export default Spinner;
