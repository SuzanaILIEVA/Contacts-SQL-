const convertFullName = (name, surname) => {
  return `${name} ${surname}`;
};

const getInitials = (name, surname) => {
  //ad ve soyad ilk harflerini al buyuk harfe cevir
  const nameinitials = name?.trim()[0].toUpperCase();
  const surnameinitials = surname?.trim()[0].toUpperCase();

  //Bas harfleri birlestir ve dondur
  return `${nameinitials}${surnameinitials}`;
};
export {convertFullName, getInitials};
