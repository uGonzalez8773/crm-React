import PropTypes from "prop-types";
import { useNavigate, Form, redirect } from "react-router-dom";
import { deleteClient } from "../data/Clients";

export async function action({ params }) {
 await deleteClient(params.clientId);
  return redirect("/crm-React/");
}

function Client({ client }) {
  const { name, company, email, phone, id } = client;
  const navigate = useNavigate();

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{name}</p>
        <p>{company}</p>
      </td>
      <td className="p-6">
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {email}
        </p>
        <p className="text-gray-600">
          <span className="text-gray-800 uppercase font-bold">Phone: </span>
          {phone}
        </p>
      </td>
      <td className="p-6 flex gap-3">
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
          onClick={() => navigate(`/crm-React/clients/${id}/edit`)}
        >
          Edit
        </button>
        <Form
          method="POST"
          action={`/crm-React/clients/${id}/delete`}
          onSubmit={(e) => {
            if (
              !confirm(
                `Do you really want to delete ${client.name} information for ever?`
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
          >
            Delete
          </button>
        </Form>
      </td>
    </tr>
  );
}

Client.propTypes = {
  client: PropTypes.object,
};

export default Client;
