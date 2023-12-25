import TravelComponent from "@/components/Travel";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>useSelectedItems</title>
      </Head>
      {/* <TravelComponent /> */}
      <div className="sm:py-8 h-screen w-screen overflow-y-hidden bg-indigo-200">
        <div className="h-full min-h-full bg-white mx-auto overflow-hidden shadow-xl sm:rounded overflow-y-auto"
          style={{ maxWidth: "30rem" }}
        >
          <TravelComponent />
        </div>
      </div>
    </div>
  )
}
