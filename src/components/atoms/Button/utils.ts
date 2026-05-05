export const getTypoSize = (size: string) => {
  switch (size) {
    case 'sm':
      return 'label6'
    case 'md':
      return 'label5'
    case 'lg':
      return 'label4'
    default:
      return 'label5'
  }
}
