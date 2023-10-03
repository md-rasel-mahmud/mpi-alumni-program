import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "../../redux/api/auth/authApi";
import { useUploadImageMutation } from "../../redux/api/utils/utilApi";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { schema } from "../../schema/yup.register.schema copy";
import JobStatus from "../../components/register/JobStatus";

const Register = () => {
  const [img, setImg] = useState("");
  const [previewImg, setPreviewImg] = useState("");
  const [jobStatus, setJobStatus] = useState(false);
  const [studentsStatus, setStudentsStatus] = useState("alumniStudent");
  const [setRegisterBody, { data: registerRes, error: registerResError }] =
    useRegisterMutation();
  const [setUploadImage] = useUploadImageMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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

  const onSubmit = async (data) => {
    if (img) {
      try {
        const { data: imgRes } = await setUploadImage(img);
        console.log(imgRes);
        if (imgRes) {
          data.image = imgRes.url;
          await setRegisterBody(data);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Something went wrong");
      }
    } else {
      try {
        await setRegisterBody(data);
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Something went wrong");
      }
    }
    console.log(data);
  };

  // showing toast
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    userId && navigate("/");

    if (registerResError) {
      if (registerResError?.status === 403) {
        toast.error(registerResError?.data.message);
        localStorage.setItem("userId", registerResError?.data.userId);

        navigate("/login");
      }

      registerResError?.status === 500 &&
        toast.error(registerResError?.data.message);
    }
    if (registerRes?.acknowledged) {
      toast.success("Registered Successful");
      localStorage.setItem("userId", registerRes?.userId);
      console.log(registerRes);
      navigate("/");
    }
  }, [registerRes, registerResError]);

  return (
    <div className="card relative w-full max-w-2xl shadow-2xl bg-base-100/30">
      <div
        className={`flex items-center justify-center flex-col absolute -translate-x-1/2 left-1/2 ${
          previewImg ? "-top-12" : "-top-8"
        } `}
      >
        {previewImg ? (
          <img
            src={previewImg}
            className="w-20 h-20 object-cover rounded-full border-secondary border-2 mt-1"
          />
        ) : (
          <FaUser className="text-6xl text-primary" />
        )}

        <h2 className="text-xl text-center bg-gray-300/5 px-6 py-2 text-secondary font-semibold tracking-widest rounded-lg">
          REGISTER
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card-body mt-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered"
              {...register("name")}
            />
            {errors.name && (
              <small className="text-error ml-1 mt-1">
                {errors.name?.message}
              </small>
            )}
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Current Location"
              className="input input-bordered"
              {...register("location")}
            />
            {errors.location && (
              <small className="text-error ml-1 mt-1">
                {errors.location?.message}
              </small>
            )}
          </div>

          <div className="form-control ">
            <select
              className="select select-bordered capitalize"
              {...register("department")}
            >
              <option value="">Select Department</option>
              <option>computer science</option>
              <option>Electrical Engineering</option>
              <option>Mechanical Engineering</option>
            </select>
            {errors.department && (
              <small className="text-error ml-1 mt-1">
                {errors.department?.message}
              </small>
            )}
          </div>
          <div className="form-control">
            <input
              type="number"
              placeholder="Phone"
              className="input input-bordered"
              {...register("phone")}
            />
            {errors.phone && (
              <small className="text-error ml-1 mt-1">
                {errors.phone?.message}
              </small>
            )}
          </div>
          <div className="form-control">
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered"
              {...register("email")}
            />
            {errors.email && (
              <small className="text-error ml-1 mt-1">
                {errors.email?.message}
              </small>
            )}
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Create Password"
              className="input input-bordered"
              {...register("password")}
            />
            {errors.password && (
              <small className="text-error ml-1 mt-1">
                {errors.password?.message}
              </small>
            )}
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Pick an Image</span>
            </label>
            {/* <input
              type="text"
              className="file-input file-input-bordered "
              accept="image/*"
              // onChange={handleImageUpload}
              defaultValue="http://res.cloudinary.com/db0nm9rt3/image/upload/v1696240445/z9ss5mr63tanv1akyeqr.jpg"
              {...register("image")}
            /> */}
            <input
              type="file"
              className="file-input file-input-bordered "
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Job status</span>
            </label>
            <select
              className="select select-bordered"
              onChange={({ target: { value } }) =>
                setJobStatus(JSON.parse(value))
              }
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            {errors.jobStatus && (
              <small className="text-error ml-1 mt-1">
                {errors.jobStatus?.message}
              </small>
            )}
          </div>
          <div className="form-control flex-row gap-2">
            <label className="label cursor-pointer">
              <span className="label-text ">Current Student</span>
              <input
                type="radio"
                name="studentStatus"
                className="radio ml-2"
                value="currentStudent"
                {...register("studentStatus.status")}
                onChange={({ target: { value } }) => setStudentsStatus(value)}
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">Alumni Student</span>
              <input
                type="radio"
                name="studentStatus"
                className="radio ml-2"
                value="alumniStudent"
                {...register("studentStatus.status")}
                onChange={({ target: { value } }) => setStudentsStatus(value)}
                defaultChecked={true}
              />
            </label>
          </div>
          <div className="from-control ">
            {studentsStatus === "alumniStudent" ? (
              <input
                type="number"
                placeholder="Passing Year"
                className="input input-bordered w-full"
                {...register("studentStatus.passingYear")}
              />
            ) : (
              <input
                type="number"
                placeholder="Session"
                className="input input-bordered w-full"
                {...register("studentStatus.session")}
              />
            )}
          </div>
        </div>
        {jobStatus && (
          <JobStatus
            register={register}
            errors={errors}
            jobStatus={jobStatus}
          />
        )}
        <label className="label mt-4">
          Already registered?
          <Link
            to="/login"
            className="label-text-alt link link-hover link-success"
          >
            Login here!
          </Link>
        </label>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
