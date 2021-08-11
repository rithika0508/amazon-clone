import React from 'react'
import './Home.css';
import Product from './Product'
function Home() {
    return (
        <div className="home">
            <div className="home__container">
            <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"/>
            <div className="home__row">
                <Product 
                id="237899"
                title="The lean start up"
                price={29.99}
                image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
                rating={5}/>
                
                <Product 
                id="49538094"
                title="kenwood Kmix Stand Mixer for Baking, Stylish kitchen Mixer with K-beater, Dough Hook and Whisk, 5 litre Glass Bowl"
                price={239.0}
                rating={4}
                image="https://orpatgroup.com/wp-content/uploads/2020/12/1-Mixer-Grinder-%E2%80%93-Kitchen-Queen-%E2%80%93-650W-%E2%80%93-White.jpg"/>
            </div>

            <div className="home__row">
            <Product 
            id="490380"
            title="Samsung LC49RG90SSUXEN 49' Curved LED TV"
            price={199.99}
            rating={3}
            image="https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"/>
            <Product 
            id="2344678"
            title="Amazon Echo 3rd generation | Smart Speaker with Alexa"
            price={98.99}
            rating={5}
            image="https://scx2.b-cdn.net/gfx/news/2020/1-alexa.jpg"/>
            <Product 
            id="679223"
            title="New Apple iPad Pro (12.9 inch, Wi-fi, 128GB)"
            price={598.99}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg"/>
            </div>

            <div className="home__row">
            <Product 
            id="344589"
            title="Samsung LC487357' CURVED LED Gaming Monitor"
            price={1094.98}
            rating={4}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"/>
            </div>
            </div>
        </div>

    )
}

export default Home
