import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schema/yupSchema";

const Login = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="card relative w-full max-w-sm shadow-2xl bg-base-100/30">
      <div className="flex items-center justify-center flex-col absolute -translate-x-1/2 left-1/2 -top-8 ">
        <FaUser className="text-6xl text-primary" />

        <h2 className="text-xl text-center bg-gray-300/5 px-6 py-2 text-secondary font-semibold tracking-widest rounded-lg">
          LOGIN
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body mt-10">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />

          {errors.email && (
            <small className="text-error mt-1">{errors.email?.message}</small>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <small className="text-error mt-1">
              {errors.password?.message}
            </small>
          )}

          <label className="label mt-4">
            Not register yet?
            <Link
              to="/register"
              className="label-text-alt link link-hover link-success"
            >
              Register here!{" "}
            </Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
