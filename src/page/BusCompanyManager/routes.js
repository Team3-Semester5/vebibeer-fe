import BusPr from "./views/BusProfile";
import Dashboard from "./views/Dashboard";
import TripList from "./views/TripList";
import EditBus from "./views/EditBus";
import profileDriver from "./views/ProfileDriver";
import EditLocation from "./views/EditLocation";
import EditService from "./views/EditService";

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
    icon: "nc-icon nc-notes ",
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
    icon: "nc-icon nc-bus-front-12",
    component: EditBus,
    layout: "/bus",
  },
  {
    path: "/profileDriver",
    name: "Profile Driver",
    icon: "nc-icon nc-delivery-fast",
    component: profileDriver,
    layout: "/bus",
  },
  {
    path: "/editLocation",
    name: "Location",
    icon: "nc-icon nc-pin-3",
    component: EditLocation,
    layout: "/bus",
  },
  {
    path: "/editService",
    name: "Service",
    icon: "nc-icon nc-puzzle-10",
    component: EditService,
    layout: "/bus",
  },
];

export default dashboardRoutes;
