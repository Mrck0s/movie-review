export const saveLocalStorageData = (userData) => {
  localStorage.setItem("userData", JSON.stringify(userData));
  console.log("datos guardados", userData);
};

export const getStorageData = () => {
  const userData = localStorage.getItem("userData");
  console.log("Datos extraidos del localstorage:", userData);
  const userDataNew = JSON.parse(userData);
  return userDataNew;
};

export const deleteStorageData = () => {
  localStorage.removeItem("userData");
  console.log("Datos borrados del localstorage");
};
