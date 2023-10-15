import { Outlet, Link, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/4 bg-blue-600 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">
          CRM clients
        </h2>
        <nav>
          <Link
            className={`${
              location.pathname === "/crm-React/"
                ? "text-blue-300"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/crm-React/"
          >
            Clients
          </Link>
          <Link
            className={`${
              location.pathname === "/crm-React/clients/new"
                ? "text-blue-300"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/crm-React/clients/new"
          >
            New Client
          </Link>
        </nav>
      </aside>

      <main className="md:w-3/4 p-10 md:h-screen overflow-scroll">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
