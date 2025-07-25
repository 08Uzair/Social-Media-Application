import dynamic from "next/dynamic";
const Dashboard = dynamic(() => import("./components/Dashboard.jsx"));
export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
