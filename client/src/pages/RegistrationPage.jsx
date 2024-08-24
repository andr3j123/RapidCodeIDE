import { Link } from "react-router-dom";

function RegistrationPage() {
  return (
    <form
      action=""
      method="post"
      className="flex flex-col justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-light-gray p-4 w-5/6 h-5/6 md:w-3/6 md:h-2/3 lg:w-2/6 xl:w-1/4"
    >
      <label htmlFor="usernameRegister" className="p-5 pl-0 pb-1 text-lg">
        Username:
      </label>
      <input
        type="text"
        name="usernameRegister"
        id="usernameRegister"
        required
        className="bg-input-bg text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />

      <label htmlFor="emailRegister" className="p-5 pl-0 pb-1 text-lg">
        Email:
      </label>
      <input
        type="email"
        name="emailRegister"
        id="emailRegister"
        required
        className="bg-input-bg text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />

      <label htmlFor="passwordRegister" className="p-5 pl-0 pb-1 text-lg">
        Password:
      </label>
      <input
        type="password"
        name="passwordRegister"
        id="passwordRegister"
        required
        className="bg-input-bg text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />

      <label htmlFor="passwordConfirm" className="p-5 pl-0 pb-1 text-lg">
        Confirm Password:
      </label>
      <input
        type="password"
        name="passwordConfirm"
        id="passwordConfirm"
        required
        className="bg-input-bg text-black shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
      />

      <input
        type="submit"
        value="Register"
        className="p-5 pb-12 text-xl cursor-pointer"
      />

      <div className="flex flex-row justify-center text-lg">
        <Link to="/login" className="text-center cursor-pointer pr-4">
          Login
        </Link>
        <Link to="/">Home</Link>
      </div>
    </form>
  );
}

export default RegistrationPage;
