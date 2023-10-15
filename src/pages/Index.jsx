import { useLoaderData } from "react-router-dom";
import { getClients } from "../data/Clients";
import Client from "../components/Client";

export function loader() {
  const clients = getClients()

  return clients
}

function Index() {
  const data = useLoaderData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clients</h1>
      <p className="mt-3">Manage your clients</p>

      {data.length ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clients</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client) => (
              <Client 
                key={client.id}
                client={client}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-10">Theres no clients so far</p>
      )}
    </>
  );
}

export default Index;