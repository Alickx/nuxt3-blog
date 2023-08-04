const isOpen = ref(false)


const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}


export function useVisible() {
  return {
    isOpen,
    toggle,
    close
  }
}
