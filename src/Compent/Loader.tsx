import { Commet } from "react-loading-indicators";

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <Commet color="#FF6900" size="medium" text="" textColor="" />
    </div>
  );
}

export default Loader;