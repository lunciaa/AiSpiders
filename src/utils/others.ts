export const dummyPromiseFunction: () => Promise<boolean> = () =>
  new Promise((resolve) => {
    resolve(false)
  })
