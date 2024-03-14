import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import { Button } from "./ui/button";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const menuVariants = {
  visible: {
    x: 0,
    transition: { duration: 0.2 },
  },
  hidden: { x: "-100%", transition: { duration: 0.2 } },
};

export default function SideMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuContent = // Your menu content here
    (
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    );

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bg-gray-800 opacity-75"
        variants={backdropVariants}
        animate={isOpen ? "visible" : "hidden"}
      />
      <motion.nav
        className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg"
        variants={menuVariants}
        animate={isOpen ? "visible" : "hidden"}
      >
        {menuContent}
      </motion.nav>
      <Button className=" p-2 text-black" onClick={toggleMenu}>
        TEST
      </Button>
    </>
  );
}
