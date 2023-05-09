import { Fragment } from 'react';
import './UserStoreItems.css';
import Card from './Card';


const UserStoreItems = (prop) => {
    console.log("ITEMS", prop.items);
    return (

        <Card className="expense-item">

            <span>
                <h2>Item name:</h2>
                <h2 className='expense-item__price'>{prop.items.itemName}</h2>
            </span>




            <span>
                <h2>Description:</h2>
                <h2 className='expense-item__price'>{prop.items.description}</h2>
            </span>



            <span>
                <h2>Price:</h2>
                <h2 className='expense-item__price'>{prop.items.price}</h2>
            </span>

            <span>
                <h2>Quantity:</h2>
                <h2 className='expense-item__price'>{prop.items.quantity}</h2>
            </span>


            <button onClick={() => { prop.buyOneButtonClicked(prop.items) }}>Buy one</button>
            <button onClick={() => { prop.buyTwoButtonClicked(prop.items) }}>Buy Two</button>

            <button onClick={() => { prop.buyThreeButtonClicked(prop.items) }}>Buy Three</button>





            <button onClick={() => { prop.deleteButtonClicked(prop.items.id) }}>Delete</button>
            <button onClick={() => prop.editButtonClicked(prop.items)}>Edit</button>
        </Card>





    )
}

export default UserStoreItems;