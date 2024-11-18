import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'green',
  colors: {
    christmas: [
      '#EDFBF0',
      '#D4F0DA',
      '#A9E1B6',
      '#7ED292',
      '#53C36E',
      '#28B449',
      '#1F903B',
      '#166C2C',
      '#0D481D',
      '#04240F',
    ],
  },
  components: {
    Card: {
      defaultProps: {
        padding: 'lg',
        radius: 'md',
      },
    },
    Title: {
      styles: {
        root: {
          '&[data-order="1"]': {
            marginBottom: rem(20),
          },
          '&[data-order="2"]': {
            marginBottom: rem(12),
          },
        },
      },
    },
    Stack: {
      defaultProps: {
        spacing: 'md',
      },
    },
  },
});
