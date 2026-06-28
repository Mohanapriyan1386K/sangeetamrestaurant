import { Commet } from "react-loading-indicators";

function OnlyLoader() {
  return (
    <div className="fixed h-full flex items-center justify-center bg-white z-50">
    <Commet color="#FF6900" size="medium" text="" textColor="" />
    </div>
  );
}

export default OnlyLoader;