import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { MdOutlineLocalPhone,MdOutlineMailOutline  } from "react-icons/md";
import { FaLocationDot,FaXTwitter } from "react-icons/fa6";
import { FaFacebookF,FaInstagram } from "react-icons/fa";
import { LiaYoutube } from "react-icons/lia";

const Footer : React.FC = () =>{
    return(
        <footer>
            <div className="footer-sections">
                <div className="footer-section">
                    <div className="footer-section-content">    
                        <Link className="logo" to='/'>
                            <h3 style={{color:"#fff"}}>Flee<span>xy</span></h3>
                        </Link>
                        <div className="tagline">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Search A Product"/>
                            <div className="search-icon">
                                <CiSearch/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-section">
                    <div className="section-links-title">
                        <h3>Categories</h3>
                    </div>    
                    <div className="section-links">    
                        <a href="/">Phones</a>
                        <a href="/">Tablets</a>
                        <a href="/">Laptops</a>
                        <a href="/">Computer Accessories</a>
                        <a href="/">Phones</a>
                    </div>            
                </div>
                <div className="footer-section">
                    <div className="section-links-title">
                        <h3>About</h3>
                    </div>    
                    <div className="section-links">    
                        <a href="/">Blog</a>
                        <a href="/">Find Help</a>
                    </div>            
                </div>
                <div className="footer-section">
                    <div className="section-links-title">
                        <h3>Contact Us</h3>
                    </div>    
                    <div className="section-links">  
                        <div className="contact-layout">
                            <MdOutlineLocalPhone color="#fff" size={23}/>
                            <a href="">+94 76 754 4717</a>
                        </div>  
                        <div className="contact-layout">
                            <MdOutlineMailOutline color="#fff" size={23}/>
                            <a href="">ranvin.789@gmail.com</a>
                        </div>  
                        <div className="contact-layout">
                            <FaLocationDot color="#fff" size={20}/>
                            <a href="">253/16, Molpe Road, Katubedda , Moratuwa</a>
                        </div>  
                    </div>            
                </div>
            </div>
            <hr className="s-line" />
            <div className="footer-links">
                <div className="footer-link">
                      <p>&copy; 2024 Fleexy All Rights Reserved</p>
                </div>
                <div className="social-links footer-link">
                    <div className="social-icons">
                          <FaFacebookF color="#fff"/>
                    </div>
                    <div className="social-icons">
                          <LiaYoutube color="#fff"/>
                    </div>
                    <div className="social-icons">
                          <FaInstagram color="#fff"/>
                    </div>
                    <div className="social-icons">
                          <FaXTwitter color="#fff"/>
                    </div>
                </div>
                <div className="footer-link">
                    <p>Terms Of Policy</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
