import React from "react";
import placeholder from "../assets/placeholder.jpg";
import List from "./List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Modal({ setShowModal }) {
  const containerVariants = {
    hiddenAbout: {
      x: -200,
      opacity: 0,
    },
    hiddenCredits: {
      x: 200,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
    exitAbout: {
      x: -200,
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.5 },
    },
    exitCredits: {
      x: 200,
      opacity: 0,
      transition: { ease: 'easeInOut', duration: 0.5 },
    },
  };

  return (
    <>
      <div className="modal">
        <motion.div
          className="modal__half modal__about"
          variants={containerVariants}
          initial="hiddenAbout"
          animate="visible"
          exit="exitAbout"
        >
          <h2>About Green World</h2>
          <p>
            Experience our interactive website about Lorem ipsum dolor, sit amet
            consectetur adipisicing elit. Atque similique nobis sapiente a
            temporibus saepe voluptates numquam ipsa magnam aliquam?
          </p>
        </motion.div>
        <motion.div
          className="modal__half modal__credits"
          variants={containerVariants}
          initial="hiddenCredits"
          animate="visible"
          exit="exitCredits"
        >
          <h2 className="modal__credits--title">Meet the crew</h2>
          <ul className="modal__credits--list">
            <List img={placeholder} name="Kiaran" />
            <List img={placeholder} name="Mario" />
            <List img={placeholder} name="Rafa" />
            <List img={placeholder} name="Quincy" />
          </ul>
          <motion.div className="close__button">
            <FontAwesomeIcon
              onClick={() => setShowModal(false)}
              icon={faXmark}
            />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default Modal;
