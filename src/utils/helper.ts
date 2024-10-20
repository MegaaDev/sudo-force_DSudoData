export const addFile = async (
  ipfsId: string,
  decryptionKey: string,
  name: string,
  thumbnail: string,
  fileType: string,
  price: number,
  description: string,
  contract
) => {
  try {
    // console.log("hello");
    // console.log(ipfsId, decryptionKey, price, name, fileType, String(thumbnail));
    const res = await contract.addFile(ipfsId, decryptionKey, String(name), String(thumbnail), fileType, description, price);
    await res.wait();
    console.log("Added file to blockchain: ", res);
  } catch (e) {
    console.error(e);
  }
};

export const buyAccess = async (ipfsId: string, price: number, contract) => {
  try {
    const res = await contract.buyAccess(ipfsId, { value: price });
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
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getUserFiles = async (contract) => {
  try {
    const res = await contract.getUserFiles();
    console.log("User files: ", res);
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getAllFiles = async (contract) => {
  try {
    const res = await contract.getFiles();
    console.log("All files: ", res);
    return res;
  } catch (e) {
    console.error(e);
  }
};