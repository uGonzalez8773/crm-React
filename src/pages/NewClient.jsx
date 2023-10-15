import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import NewClientForm from "../components/NewClientForm";
import Error from "../components/Error";
import { addClients } from "../data/Clients";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const email = formData.get("email");

  const errors = [];
  if (Object.values(data).includes("")) {
    errors.push("All fileds are mandatory");
  }

  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  if (!regex.test(email)) {
    errors.push("The email is not valid");
  }

  if (Object.keys(errors).length) {
    console.log("There are some errors");
    return errors;
  }

  await addClients(data);
  return redirect('/crm-React/')
}

function NewClient() {
  const formErrors = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> New Client</h1>
      <p className="mt-3">Complete all fields to add a new client</p>

      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py1 font-bold uppercase rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20 ">
        {formErrors?.length &&
          formErrors.map((error, i) => <Error key={i}>{error}</Error>)}

        <Form method="post" noValidate>
          <NewClientForm />
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

export default NewClient;
