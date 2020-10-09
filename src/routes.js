import Dashboard from "views/Dashboard.js";
import Tutoriales from "views/Tutoriales.js";

var dashRoutes = [
  {
    path: "/tutoriales",
    name: "Tutoriales",
    icon: "files_paper",
    component: Tutoriales,
    layout: "/admin",
  },
  
];
export default dashRoutes;
