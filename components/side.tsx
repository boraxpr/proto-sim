import React, { useState } from "react";
import { motion, stagger } from "framer-motion"; // Import Framer Motion
import { Button } from "./ui/button";
import Link from "next/link";

const backdropVariants = {
  visible: { opacity: 0.5 },
  hidden: { opacity: 0 },
};

const menuVariants = {
  visible: {
    x: 0,
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
      <>
        <motion.ul className="flex flex-col space-y-10 justify-evenly">
          <motion.li>
            <Button className=" text-white w-full" onClick={toggleMenu}>
              TEST
            </Button>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/">HOME</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/fetch_react_query">REACT-QUERY</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/fetch_use_effect">REACT-USE-EFFECT</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/fetch_use_swr">REACT-USE-SWR</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/fetch_use_trpc">REACT-USE-TRPC</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link href="/cropper">REACT_EZ_CROP</Link>
          </motion.li>
        </motion.ul>
      </>
    );

  return (
    <>
      <motion.div
        className="fixed w-full h-full top-0 right-0 bg-gray-800 -z-[1]"
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
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={toggleMenu}
        className="relative top-0 left-0 w-14 p-2 bg-black text-white rounded-lg"
      >
        TEST
      </motion.button>
    </>
  );
}
