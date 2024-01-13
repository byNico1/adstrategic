"use client" // Add a semicolon here

// Import React and useLayoutEffect hooks
import React, { useLayoutEffect } from "react"

// Define a custom component that takes an array of logos as props
const Scroller = ({ logos }) => {
  // Get a reference to the container element
  const containerRef = React.useRef(null)

  // Define a function that animates the logos
  const animateLogos = () => {
    // Get the container element and its width
    const container = containerRef.current
    const containerWidth = container.offsetWidth

    // Get the first logo element and its width
    const logo = container.firstChild
    const logoWidth = logo.offsetWidth

    // Calculate the number of logos needed to fill the container
    const logoCount = Math.ceil(containerWidth / logoWidth)

    // Clone the logos until the container is filled
    for (let i = 0; i < logoCount; i++) {
      container.appendChild(logo.cloneNode(true))
    }

    // Set the initial position of the container
    container.style.left = "0px"

    // Define a function that moves the container to the left
    const moveLeft = () => {
      // Get the current position of the container
      const position = parseInt(container.style.left)

      // If the position is less than the negative width of one logo, reset it to zero
      if (position < -logoWidth) {
        container.style.left = "0px"
      } else {
        // Otherwise, decrement the position by one pixel
        container.style.left = position - 1 + "px"
      }

      // Request the next animation frame
      requestAnimationFrame(moveLeft)
    }

    // Start the animation
    moveLeft()
  }

  // Use the useLayoutEffect hook to run the animation after the component is mounted
  useLayoutEffect(() => {
    animateLogos()
  }, [])

  // Return the JSX for the container element with the logo elements
  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        maxWidth: "400px",
        height: "100px",
      }}
    >
      {logos.map((logo, index) => (
        <img key={index} src={logo} alt="logo" style={{ width: "100px", margin: "0 10px" }} />
      ))}
    </div>
  )
}

// Export the component
export default Scroller
