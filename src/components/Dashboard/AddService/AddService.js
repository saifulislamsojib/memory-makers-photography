import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import swal from "sweetalert";
import { context } from "../../../App";
import "./AddService.css";

const AddService = ({ updates, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setServices } = useContext(context);

  const [image, setImage] = useState(updates?.image || "");

  const fromRef = useRef(null);

  useEffect(() => {
    document.title = "add-services";
  }, []);

  const onSubmit = (data) => {
    if (image) {
      const { allFeatures, ...other } = data;
      const features = allFeatures.split(", ");
      const serviceData = { features, image, ...other };
      const path = updates ? `updateService/${updates._id}` : "addService";
      const method = updates ? "PATCH" : "POST";
      toast.promise(
        fetch(`https://memory-makers-photography-server.vercel.app/${path}`, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(serviceData),
        })
          .then((res) => res.json())
          .then(({ inserted, _id }) => {
            if (inserted) {
              swal(
                `${updates ? "Updated" : "Added"} Successfully!`,
                `Service ${updates ? "Updated" : "Added"} Successfully!`,
                "success"
              );
              fromRef.current.reset();
              if (updates) {
                setServices((preServices) => {
                  const index = preServices.findIndex(
                    (service) => service._id === updates._id
                  );
                  const newServices = [...preServices];
                  const newService = { ...newServices[index] };
                  newServices[index] = { ...newService, ...serviceData };
                  return newServices;
                });
                setIsOpen(false);
              } else {
                setServices((preServices) =>
                  preServices.length
                    ? [...preServices, { ...serviceData, _id }]
                    : preServices
                );
              }
            } else {
              setIsOpen(false);
              if (updates) {
                swal("Not Updated", "Not Updated Anything", "error");
              } else {
                swal("Not Added", "Not Added The Service", "error");
              }
            }
          }),
        {
          loading: updates ? "Updating..." : "Adding..",
          success: (
            <b>{updates ? "Updated Successfully!" : "Added Successfully"}</b>
          ),
          error: <b>Could not {updates ? "updated" : "Added"}.</b>,
        }
      );
    } else {
      swal("Image is required", "Image is required", "error");
    }
  };

  const handleImageUpload = (e) => {
    setImage("");
    const imageData = new FormData();
    imageData.set("key", process.env.REACT_APP_IMAGE_KEY);
    imageData.append("image", e.target.files[0]);
    toast.promise(
      fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imageData,
      })
        .then((res) => res.json())
        .then((result) => setImage(result.data.display_url)),
      {
        loading: "Uploading...",
        success: <b>Uploaded Successfully!</b>,
        error: <b>Could not uploaded.</b>,
      }
    );
  };

  const arrFeatures = updates?.features.join(", ");

  return (
    <>
      {!updates && <Toaster />}
      <div className="container mt-5">
        <form
          ref={fromRef}
          className={updates ? "row" : "row add-service-form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3 col-md-6">
            <label className="mb-2">Service title</label>
            <input
              defaultValue={updates?.title}
              type="text"
              className="form-control"
              {...register("title", { required: true })}
              placeholder="Service title"
            />
            {errors.title && (
              <span className="text-danger">Title is required</span>
            )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="mb-2">
              Service features{" "}
              <small className="text-muted">
                (You should write each feature by a comma and a space)
              </small>
            </label>
            <input
              defaultValue={arrFeatures}
              type="text"
              className="form-control"
              {...register("allFeatures", { required: true })}
              placeholder="Service Features"
            />
            {errors.allFeatures && (
              <span className="text-danger">Features is required</span>
            )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="mb-2">Service price</label>
            <input
              defaultValue={updates?.price}
              type="text"
              className="form-control"
              {...register("price", { required: true })}
              placeholder="Service price"
            />
            {errors.price && (
              <span className="text-danger">Price is required</span>
            )}
          </div>
          <div className="mb-3 col-md-6">
            <label className="d-block mb-2">Upload Photo</label>
            <label
              className="btn btn-outline-success px-4"
              htmlFor="imageUpload"
            >
              <FontAwesomeIcon icon={faCloudUploadAlt} /> Upload Photo
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              id="imageUpload"
              className="d-none"
            />
          </div>
          <div>
            <button
              disabled={image === ""}
              type="submit"
              className="d-block btn btn-success mt-3 ms-auto"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddService;
