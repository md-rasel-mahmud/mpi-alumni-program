import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setPreviewImg(URL.createObjectURL(file));

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "favqo8bj");
      formData.append("cloud_name", "db0nm9rt3");
      setImg(formData);
    }
  };
  // console.log(watch());
  const onSubmit = async (data) => {
    if (img) {
      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/db0nm9rt3/image/upload",
          {
            method: "POST",
            body: img,
          }
        );
        console.log("Image uploaded successfully:", response);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    console.log({ data, img });
  };

  return (
    <div className="card relative w-full max-w-sm shadow-2xl bg-base-100/30">
      <div className="flex items-center justify-center flex-col absolute -translate-x-1/2 left-1/2 -top-8 ">
        <FaUser className="text-6xl text-primary" />

        <h2 className="text-xl text-center bg-gray-300/5 px-6 py-2 text-secondary font-semibold tracking-widest rounded-lg">
          REGISTER
        </h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card-body mt-10 grid grid-cols-2"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered"
            {...register("email", { required: true })}
          />
          {errors.email && <small>{errors.email?.message}</small>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Pick a Image</span>
          </label>

          <input
            type="file"
            className="file-input file-input-bordered w-full"
            onChange={handleImageUpload}
          />
          {previewImg && (
            <img
              src={previewImg}
              className="w-full h-32 object-cover rounded mt-1"
            />
          )}
          {errors.image && <small>{errors.image?.message}</small>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Create Password</span>
          </label>
          <input
            type="password"
            placeholder="Create Password"
            className="input input-bordered"
            accept="image/*"
            {...register("password", { required: true })}
          />
          {errors.password && <small>{errors.password?.message}</small>}

          <label className="label mt-4">
            Already registered?
            <Link
              to="/login"
              className="label-text-alt link link-hover link-success"
            >
              Login here!
            </Link>
          </label>
        </div>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
