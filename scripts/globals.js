// Global variables initialization

export const getImgSize = (alpha, container) => {
  if (container.offsetWidth123 > container.offsetHeight) {
    return alpha*container.offsetHeight;
  } else {
    return alpha*container.offsetWidth;
  }
}
