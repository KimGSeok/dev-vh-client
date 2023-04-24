const useConfirmHandler = (message?: string) => {
  return new Promise((resolve, reject) => {

    console.log(document);
    const element = document.getElementById("dialog");

    console.log(resolve);
    console.log(reject);
  })
}

const customWindow = {
  confirm: async (message: string) => useConfirmHandler(message),
}

export default customWindow;