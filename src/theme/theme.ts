import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        bg: 'gray.100'
      }
    }
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif"
  },
  colors: {
    gray: {
      50: 'hsl(210 20% 98%)',
      100: 'hsl(220 14% 96%)',
      200: 'hsl(220 13% 91%)',
      300: 'hsl(216 12% 84%)',
      400: 'hsl(218 11% 65%)',
      500: 'hsl(220 9% 46%)',
      600: 'hsl(215 14% 34%)',
      700: 'hsl(217 19% 27%)',
      800: 'hsl(215 28% 17%)',
      900: 'hsl(221 39% 11%)'
    },
    brand: {
      50: 'hsl(209 84% 96%)',
      100: 'hsl(209 84% 66%)',
      200: 'hsl(209 84% 61%)',
      300: 'hsl(209 84% 56%)',
      400: 'hsl(209 84% 46%)',
      500: 'hsl(209 84% 41%)',
      600: 'hsl(209 84% 36%)',
      700: 'hsl(209 84% 31%)',
      800: 'hsl(209 83% 26%)'
    },
    danger: {
      50: 'hsl(353 81% 96%)',
      500: 'hsl(353 81% 51%)',
      600: 'hsl(353 81% 46%)'
    }
  },
  shadows: {
    outline: '0 0 0 3px hsl(209 84% 56% / 40%)'
  }
})

export default theme
