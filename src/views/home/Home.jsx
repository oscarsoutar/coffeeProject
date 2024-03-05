import React from 'react'
import './Home.css'

export default function Home() {
    return (
        <section className='home' id='home'>
            <div className='home_container'>
                <div className='home_content'>
                    <h1 className='home_title'>
                        Welcome to Brew Bliss
                    </h1>
                    <p className="home_description">
                        The home of the best coffee in the world! You can order online or book a table with us now!
                    </p>
                    <div className='home_button'>
                        <a href='about' className='button'>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}