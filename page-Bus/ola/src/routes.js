import BusPr from "views/BusProfile";
import Dashboard from "views/Dashboard.js";
import TripList from "views/TripList.js";
import EditBus from "views/EditBus";

const dashboardRoutes = [
  {
    path: "/dataTable",
    name: "Data Table",
    icon: "nc-icon nc-money-coins",
    component: Dashboard,
    layout: "/bus",
  },
  {
    path: "/list",
    name: "Trip List",
    icon: "nc-icon nc-notes",
    component: TripList,
    layout: "/bus",
  },
  {
    path: "/busProfile",
    name: "Bus Profile",
    icon: "nc-icon nc-circle-09",
    component: BusPr,
    layout: "/bus",
  },
  {
    path: "/editBus",
    name: "Edit Bus",
    icon: "nc-icon nc-layers-3",
    component: EditBus,
    layout: "/bus",
  },
];

export default dashboardRoutes;
