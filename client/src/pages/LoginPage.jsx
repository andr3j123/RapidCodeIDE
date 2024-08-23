import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <form
      action=""
      method="post"
      className="flex flex-col justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light-gray p-4 w-5/6 h-1/2 md:w-3/6 lg:w-2/6 xl:w-1/4"
    >
      <label htmlFor="emailLogin" className="p-5 pl-0 pb-1 text-lg">
        Email:
      </label>
      <input
        type="email"
        name="emailLogin"
        id="emailLogin"
        required
        className="bg-input-bg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <label htmlFor="passwordLogin" className="p-5 pl-0 pb-1 text-lg">
        Password:
      </label>
      <input
        type="password"
        name="passwordLogin"
        id="passwordLogin"
        required
        className="bg-input-bg shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <input
        type="submit"
        value="Log in"
        className="p-5 pb-12 text-xl cursor-pointer"
      />

      <div className="flex flex-row justify-center text-lg">
        <Link to="/register" className="text-center cursor-pointer pr-4">
          Register
        </Link>
        <Link to="/">Home</Link>
      </div>
    </form>
  );
}

export default LoginPage;
