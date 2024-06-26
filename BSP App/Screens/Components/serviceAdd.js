// FormUtils.js
export const updateServiceArea = (
  services,
  setServices,
  otherServices,
  setOtherServices,
  serviceArea,
  setServiceArea
) => {
  let updatedServiceArea = serviceArea || "";

  if (services === "None") {
    if (otherServices && otherServices.trim() !== "") {
      updatedServiceArea = updatedServiceArea
        ? `${updatedServiceArea}, ${otherServices}`
        : otherServices;
    }
  } else {
    if (services && services.trim() !== "") {
      if (otherServices && otherServices.trim() !== "") {
        updatedServiceArea = updatedServiceArea
          ? `${updatedServiceArea}, ${services}, ${otherServices}`
          : `${services}, ${otherServices}`;
      } else {
        updatedServiceArea = updatedServiceArea
          ? `${updatedServiceArea}, ${services}`
          : services;
      }
    }
  }

  setServiceArea(updatedServiceArea);
  setServices("");
  setOtherServices("");
};
