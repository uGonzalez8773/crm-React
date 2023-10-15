import {
  Form,
  useNavigate,
  useLoaderData,
  useActionData,
  redirect,
} from "react-router-dom";
import NewClientForm from "../components/NewClientForm";
import { getClient, updateClient } from "../data/Clients";
import Error from "../components/Error";

export async function loader({ params }) {
  const client = await getClient(params.clientId);

  if (Object.values(client).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No results.",
    });
  }

  return client;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("All fileds are mandatory");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \\t]|([\\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\\t -Z^-~]*])"
  );  

  if (!regex.test(email)) {
    errors.push("The email is not valid");
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  await updateClient(params.clientId, data);
  return redirect("/crm-React/");
}

function EditClient() {
  const navigate = useNavigate();
  const client = useLoaderData();
  const errors = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> Edit Client</h1>
      <p className="mt-3">You can now edit the clients information:</p>

      <div className="flex justify-end">
        <button
          className="bg-red-800 text-white px-3 py-2 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20 ">
        {errors?.length &&
          errors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <NewClientForm client={client} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg rounded-md"
            value={`Save ${client.name}'s newest information`}
          />
        </Form>
      </div>
    </>
  );
}

export default EditClient;
