import { Commet } from "react-loading-indicators";

function OnlyLoader() {
  return (
    <div className="fixed h-full flex items-center justify-center">
    <Commet color="#FF6900" size="medium" text="" textColor="" />
    </div>
  );
}

export default OnlyLoader;