/* eslint-disable react/prop-types */
const JobStatus = ({ register, errors, jobStatus }) => {
  return (
    <div className="bg-black/20 rounded-lg p-2">
      <h3 className="pl-1 my-1">Job Status</h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 ">
        <div className="form-control">
          <input
            type="text"
            placeholder="Company Name"
            className="input input-bordered"
            {...register("jobStatus.companyName")}
            required={jobStatus}
          />
          {errors.jobStatus?.companyName && (
            <small className="text-error ml-1 mt-1">
              {errors.jobStatus?.companyName?.message}
            </small>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Designation"
            className="input input-bordered"
            {...register("jobStatus.designation")}
            required={jobStatus}
          />
          {errors.jobStatus?.designation && (
            <small className="text-error ml-1 mt-1">
              {errors.jobStatus?.designation?.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobStatus;
