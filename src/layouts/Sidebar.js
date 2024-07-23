import { useState } from "react";
import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "My Patients",
    href: "/patients",
    icon: "bi bi-speedometer2",
  },
  {
    title: "My Excercises",
    href: "/exercises",
    icon: "bi bi-bell",
  },
  {
    title: "My Timetable",
    href: "/timetable",
    icon: "bi bi-patch-check",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: "bi bi-hdd-stack",
  },
  {
    title: "Login",
    href: "/login",
    icon: "bi bi-card-text",
  },
  {
    title: "ABC Therapy Center",
    href: "#",
    icon: "bi bi-columns",
    submenu: [
      {
        title: "All Therapists",
        href: "/alltherapists",
      },
      {
        title: "All Patients",
        href: "/allpatients",
      },
      {
        title: "All Techniques",
        href: "/alltechniques",
      },
    ],
  },
];

const Sidebar = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  let location = useLocation();

  const toggleSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
                onClick={navi.submenu ? toggleSubmenu : undefined}
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
              {navi.submenu && isSubmenuOpen && (
                <Nav className="ps-4">
                  {navi.submenu.map((submenu, subIndex) => (
                    <NavItem key={subIndex} className="sidenav-bg">
                      <Link
                        to={submenu.href}
                        className={
                          location.pathname === submenu.href
                            ? "text-primary nav-link py-2"
                            : "nav-link text-secondary py-2"
                        }
                      >
                        <span className="ms-3 d-inline-block">
                          {submenu.title}
                        </span>
                      </Link>
                    </NavItem>
                  ))}
                </Nav>
              )}
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
