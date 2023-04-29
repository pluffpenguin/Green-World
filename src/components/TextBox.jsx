import React from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

function TextBox() {
  const containerVariants = {
    hidden: {
      y: 300,
      transition: { type: "spring", stiffness: 10 },
    },
    visible: {
      y: 0,
    },
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="text__box--wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="text__box">
            <div className="text__wrapper">
              <p className="text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit itaque ratione sunt necessitatibus, voluptas asperiores
                hic temporibus saepe, omnis eum voluptatum quod corporis laborum
                sint accusamus ipsam nihil quas quasi.
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default TextBox;
