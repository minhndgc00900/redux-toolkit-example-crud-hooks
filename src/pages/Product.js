import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';
import { updateProduct, deleteProduct } from "../slices/products";
import ProductDataService from "../services/ProductService";

const Product = (props) => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialProductState = {
    title: "",
    description: "",
    published: false
  };
  const [currentProduct, setCurrentProduct] = useState(initialProductState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getProduct = id => {
    ProductDataService.get(id)
      .then(response => {
        if(response.data){
          const { title, description } = response.data;

          setCurrentProduct({
            title,
            description
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getProduct(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const updateStatus = status => {
    const data = {
      title: currentProduct.title,
      description: currentProduct.description,
      published: status
    };

    dispatch(updateProduct({ id: currentProduct.id, data }))
      .unwrap()
      .then(response => {
        console.log(response);
        setCurrentProduct({ ...currentProduct, published: status });
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateContent = () => {
    dispatch(updateProduct({ id: id, data: currentProduct }))
      .unwrap()
      .then(response => {
        console.log(response);
        setMessage("The product was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeProduct = () => {
    dispatch(deleteProduct({ id: currentProduct.id }))
      .unwrap()
      .then(() => {
        navigate("/products");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentProduct ? (
        <div className="edit-form">
          <h4>Product</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentProduct.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentProduct.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentProduct.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentProduct.published ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateStatus(true)}
            >
              Publish
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={removeProduct}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Product...</p>
        </div>
      )}
    </div>
  );
};

export default Product;
