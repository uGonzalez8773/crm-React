import { Form, useNavigate, useLoaderData } from "react-router-dom";
import NewClientForm from "../components/NewClientForm";
import { getClient } from "../data/Clients";
import Error from "../components/Error";

export async function loader({ params }) {
  const client = await getClient(params.clientId);
  console.log(client);

  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No results.",
    });
  }

  return client;
}

function EditClient() {
  const navigate = useNavigate();
  const client = useLoaderData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> Edit Client</h1>
      <p className="mt-3">You can now edit the clients information:</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py1 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20 ">
        {client?.length &&
          client.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <NewClientForm client={client}/>
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md"
            value="Register new client"
          />
        </Form>
      </div>
    </>
  );
}

export default EditClient;
