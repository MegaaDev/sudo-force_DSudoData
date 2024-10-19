export const addFile = async (
    ipfsId: string,
    decryptionKey: string,
    price: number,
    contract
  ) => {
    try {
        console.log("hello");
      const res = await contract.addFile(ipfsId, decryptionKey, price);
      await res.wait();
      console.log("Added file to blockchain: ", res);
    } catch (e) {
      console.error(e);
    }
  };
  
  export const buyAccess = async (ipfsId: string, contract) => {
    try {
      const res = await contract.buyAccess(ipfsId);
      await res.wait();
      console.log("Bought file: ", res);
    } catch (e) {
      console.error(e);
    }
  };
  
  export const getFileData = async (ipfsId: string, contract) => {
    try {
      const res = await contract.getFileData(ipfsId);
      console.log("File data: ", res);
    } catch (e) {
      console.error(e);
    }
  };
  
  export const getUserFiles = async (contract) => {
    try {
      const res = await contract.getUserFiles();
      console.log("User files: ", res);
    } catch (e) {
      console.error(e);
    }
  };
  
  export const getAllFiles = async (contract) => {
    try {
      const res = await contract.getFiles();
      console.log("All files: ", res);
    } catch (e) {
      console.error(e);
    }
  };