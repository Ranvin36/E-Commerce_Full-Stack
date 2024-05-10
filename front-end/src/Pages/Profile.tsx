import React from "react"
import { useSelector } from "react-redux"
import { types } from "../redux/types"
import { MdDeleteOutline } from "react-icons/md";


const Profile : React.FC = () =>{
    const selector = useSelector((state:types)=> state.reducer.data)
    return(
        <div className="profile-container">
            <div className="details-activities">
               <div className="user-details">
                        <div className="user-image">
                            <p>{selector.username && selector.username.slice(0,1)}</p>
                        </div>
                        <div className="user-info">
                             <p>{selector.username && selector.username}</p>
                             <p>{selector.email && selector.email}</p>
                        </div>
                        {/* <div className="activity-summary">
                            <p>Reviews - 5</p>
                            <p>Orders - 10</p>
                        </div> */}
                </div> 
               <div className="user-activities">
                    <div className="activities-title">
                        <h3>Activities</h3>
                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Favourites</h3>
                            <div className="section-line"></div>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Reviews</h3>
                            <div className="section-line"></div>
                        </div>
                        <div className="activities-grid">
                            <p>Nice Product! Can I Contact You Personally?</p>
                            <div className="editable-icons">
                                <MdDeleteOutline/>
                                <MdDeleteOutline/>
                            </div>
                        </div>
                        <div className="activities-grid">
                            <p>Nice Product! Can I Contact You Personally?</p>
                            <div className="editable-icons">
                                <MdDeleteOutline/>
                                <MdDeleteOutline/>
                            </div>
                        </div>

                    </div>
                    <div className="orders activities-section">
                        <div className="activities-title">
                            <h3 style={{fontSize:23}}>Orders</h3>
                            <div className="section-line"></div>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                        <div className="activities-grid">
                            <div className="favourites-image">
                                <img src="images/realme-c55.png" alt="product-image" />
                            </div>
                            <h3>Samsung Galaxy S23</h3>
                            <p>$1000</p>
                            <MdDeleteOutline/>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default Profile