module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tungsten: ['Tungsten', 'sans-serif']
      },
      backgroundColor: {
        'black': '#4d0000', // Black background
        'white': '#fff',    // White background
      },
      textColor: {
        'black': '#4d0000', // Black text
        'white': '#fff',    // White text
      },
      borderColor: {
        '4d0000': '#4d0000', // Custom border color
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#4d0000", // Set primary color to black
          "secondary": "#fff",   // Set secondary color to white
          "neutral": "#3D4451",
        }
      }
    ]
  }
}

