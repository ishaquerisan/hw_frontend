const checkAdmin = (setIsAdmin) => {
  const token = localStorage.getItem("token");
  if (token == null) {
    setIsAdmin(false);
    return;
  }
  const usertk = token.split(".")[1];
  const decodedtk = JSON.parse(atob(usertk));
  const type = decodedtk.type;
  console.log(type);
  if (type == "admin") {
    setIsAdmin(true);
  } else {
    setIsAdmin(false);
  }
};

export default checkAdmin;
