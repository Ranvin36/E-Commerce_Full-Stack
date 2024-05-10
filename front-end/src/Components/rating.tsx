import React from "react"
import { FaStar } from "react-icons/fa6";

interface RatingProp{
    number:number,
    rating:number;
    setRating: (value:number) => void
}


const Rating:React.FC<RatingProp>= ({number,setRating,rating}) =>{
    let stars = [];
    for(let i=0; i<number; i++){
        stars.push(<FaStar color="YELLOW"  style={{marginRight:5}}/>)
    }

    function Handlerating(){
        if(number == rating){
            setRating(0);
            return;
        }
        setRating(number)
    }
    return(
        <div className={ rating==number ? "clicked-rating star-rating" :"star-rating"} onClick={Handlerating}>
            {stars && stars.map((item,index)=>{
                return(
                    <div >
                        {item}
                    </div>
                )
            })}
            <p>{number}</p>
        </div>
    )
}

export default Rating