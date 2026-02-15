import React from 'react'
import { featuredProducts } from '../configs/data'
import './HomeComponent.css'

const HomeComponent = () => {
  return (
      <div className="landing-page">
          <section className="hero">
              {/* Hero section with promotional content */}
              <h1>Welcome to our AppFresh Store</h1>
              <p>Discover amazing products at great prices.</p>
              <button>Shop Now</button>
          </section>
          <section className="products" id="products">
              {/* Products section */}
              <h2>Featured Products</h2>
              {/* Display featured products */}
              <div className="product-list">
                  {/* Individual product cards */}
                  {
                      featuredProducts.length > 0 && featuredProducts.map((product, idx) => <div className="product-card" key={idx}>
                          <img src={product.image} alt={product.name} className='product-image' />
                          <h6>{product.name}</h6>
                      </div>)
                  }

                  {/* Repeat for other featured products */}
              </div>
          </section>
          <section className="about" id="about">
              {/* About section */}
              <h2>About Us</h2>
              <p>Learn about our company and mission.</p>
          </section>
          <section className="contact" id="contact">
              {/* Contact section */}
              <h2>Contact Us</h2>
              <p>Reach out to us for any inquiries or support.</p>
          </section>
          <footer>
              {/* Footer section */}
              <p>&copy; 2024 <i className="text-secondary">AppFreshFood</i> Store. All rights reserved.</p>
          </footer>
      </div>
  )
}

export default HomeComponent