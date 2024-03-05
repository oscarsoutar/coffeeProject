import React from "react";
import './About.css'
import aboutImg from '../../assets/image/about_img.jpeg'
import instagram_logo from '../../assets/image/instagram_logo.png'
import facebook_logo from '../../assets/image/facebook_logo.png'
import gmaps_logo from '../../assets/image/googlemaps_logo.png'

export default function About() {
    return (
        <section className="about_page">
            <div className="about_img_grid">
                <img src={aboutImg} alt="Coffee Shop" className="about_img" />
            </div>
            <div className="about_section">
                <h1 className="about_h1">
                    About Us
                </h1>
                <h2 className="about_h2">
                    Our coffee beans are delicious, fresh, organic and high quality. 
                </h2>
                <p className="about_details">
                    At Brew Bliss we offer a unique coffee house environment unlike any other in Thailand. We are not only a place to drop in and get your morning cup of coffee, we are a place where you can sit down aand enjoy a gourmet cup of coffee. If you need to work, we also have a specific area created for people who come to work.
                </p>
                <p className="contact_us">
                    Contact Us Here:
                </p>
                <div className="about_buttons">
                    <a href="https://www.instagram.com/" className="insta_button">
                        <img src={instagram_logo} alt="Instagram" className="insta_img"/>
                    </a>
                    <a href="https://www.facebook.com/" className="facebook_button">
                        <img src={facebook_logo} alt="Facebook" className="facebook_img" />
                    </a>
                    <a href="https://www.googlemaps.com/" className="gmaps_button">
                        <img src={gmaps_logo} alt="Google Maps" className="gmaps_img" />
                    </a>
                </div>
            </div>
        </section>
    )
}