
import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import UserStoreItems from './UserStoreItems';
import { generalStoreAction } from '../store/generalStore-reducer';
import { useDispatch, useSelector } from 'react-redux';

const UserStoreForm = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const dispatch = useDispatch();
  const storeArr = useSelector((state) => state.generalStoreItems.storeItems);





  const enteredItemNameRef = useRef();
  const enteredDesRef = useRef();
  const enteredPriceRef = useRef();
  const enteredQuantityRef = useRef();


  useEffect(() => {
    axios.get('http://localhost:2000/getStoreItems').then(arr => setStoreItems(arr.data))

  }, [])
  console.log(storeItems);


  const buyOneButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 1
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }

  const buyTwoButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 2
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }

  const buyThreeButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 3
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }

  const editButtonHandler = (data) => {
    console.log("DATA", data)
    dispatch(generalStoreAction.edditingStoreItems(data.id));

    enteredItemNameRef.current.value = data.itemName;
    enteredDesRef.current.value = data.description;
    enteredPriceRef.current.value = data.price;

    enteredQuantityRef.current.value = data.quantity;


    setIsEditId(data.id);
  };





  const deleteHandler = (id) => {
    axios.delete(`http://localhost:2000/deleteUser/${id}`).then(arr => setStoreItems(arr.data))
  }



  const addStoreItemsHandler = (event) => {
    event.preventDefault();
    const enteredDes = enteredDesRef.current.value;

    const enteredItemName = enteredItemNameRef.current.value;
    const enteredPrice = enteredPriceRef.current.value;
    const enteredQuantity = enteredQuantityRef.current.value;


    const storeObj = {
      itemName: enteredItemName,
      description: enteredDes,
      price: enteredPrice,
      quantity: enteredQuantity
    };

    if (
      enteredItemName.trim().length === 0 ||
      enteredDes.trim().length === 0 ||
      enteredPrice.trim().length === 0 ||
      enteredQuantity.trim().length === 0
    ) {
      alert("Fill all inputs before submit");
    } else {
      if (isEditId === null) {
        console.log("post");
        const resData = (res) => {
          const storeObjWithId = { ...storeObj, Id: res.data.ItemName };
          dispatch(generalStoreAction.addingNewStoreItems(storeObjWithId));
        };

        axios.post('http://localhost:2000/addStoreItems', storeObj).then(arr => setStoreItems(arr.data));



      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          dispatch(generalStoreAction.addingNewStoreItems(data.data));
          setIsEditId(null);
        };

        axios.post(`http://localhost:2000/editStoreItems/${isEditId}`, storeObj).then(arr => setStoreItems(arr.data));




      }
    }


    enteredItemNameRef.current.value = "";
    enteredDesRef.current.value = "";
    enteredPriceRef.current.value = "";

    enteredQuantityRef.current.value = "";

  };


  return (
    <Fragment>
      <div>
        <form>
          <h1>General Store Form</h1>
          <label htmlFor="name">Item Name</label>
          <input ref={enteredItemNameRef} type="text" id="name"></input>


          <label htmlFor="description">Description</label>
          <input ref={enteredDesRef} type="text" id="description"></input>

          <label htmlFor="price">Price</label>
          <input ref={enteredPriceRef} type="number" id="price"></input>

          <label htmlFor="quantity">Quantity</label>
          <input ref={enteredQuantityRef} type="number" id="quantity"></input>
          <button onClick={addStoreItemsHandler}>Submit</button>
        </form>


      </div>

      <section>
        <h1>Your Store Items</h1>
        {storeItems.length > 0 && storeItems.map((obj) => {
          return (<UserStoreItems
            key={Math.random()}
            items={obj}
            deleteButtonClicked={deleteHandler}
            editButtonClicked={editButtonHandler}
            buyOneButtonClicked={buyOneButtonHandler}
            buyTwoButtonClicked={buyTwoButtonHandler}
            buyThreeButtonClicked={buyThreeButtonHandler}



          />)
        })}

      </section>

    </Fragment>
  )
}

export default UserStoreForm;