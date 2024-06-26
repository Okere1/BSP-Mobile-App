// FormUtils.js
export const updateSpareArea = (
  spare,
  setSpare,
  otherSpares,
  setOtherSpares,
  spareArea,
  setSpareArea
) => {
  let updatedSpareArea = spareArea || "";

  if (spare === "None") {
    if (otherSpares && otherSpares.trim() !== "") {
      updatedSpareArea = updatedSpareArea
        ? `${updatedSpareArea}, ${otherSpares}`
        : otherSpares;
    }
  } else {
    if (spare && spare.trim() !== "") {
      if (otherSpares && otherSpares.trim() !== "") {
        updatedSpareArea = updatedSpareArea
          ? `${updatedSpareArea}, ${spare}, ${otherSpares}`
          : `${spare}, ${otherSpares}`;
      } else {
        updatedSpareArea = updatedSpareArea
          ? `${updatedSpareArea}, ${spare}`
          : spare;
      }
    }
  }

  setSpareArea(updatedSpareArea);
  setSpare("");
  setOtherSpares("");
};
