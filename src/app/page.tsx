import NavBar from "./component/NavBar";

export default function Home() {
  return (
    <>
      <div className="flex flex-row">
        {/* navbar shape and background */}
        <div className="w-1/5 h-screen bg-gray-50">
          <NavBar/>
        </div>
        <div className="w-4/5 h-screen">

        </div>
      </div>
    </>
  );
}
