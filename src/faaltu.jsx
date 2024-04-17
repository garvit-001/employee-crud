import React from "react";

const faaltu = () => {
  return (
    <div>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="efirst" className="form-label">
                    first
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirst"
                    name="efirst"
                    value={emp.efirst}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required={true}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="elast" className="form-label">
                    last
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elast"
                    name="elast"
                    value={emp.elast}
                    onChange={onChange}
                    required={true}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="eage" className="form-label">
                    age
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eage"
                    name="eage"
                    value={emp.eage}
                    onChange={onChange}
                    required={true}
                    minLength={5}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
                // disabled={
                //   employee.elast.length < 5 || employee.eemail.length < 5
                // }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default faaltu;
