import React from "react";

function Footer() {
  return (
    <footer className="text-center p-4 bg-blue-600 text-white mt-6">
      <p>© {new Date().getFullYear()} Doctor Appointment App</p>
    </footer>
  );
}

export default Footer;
