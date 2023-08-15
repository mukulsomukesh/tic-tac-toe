import React, { useState } from 'react';
import { Flex, Modal, ModalOverlay, ModalContent, ModalBody, Heading } from '@chakra-ui/react';
import CustomButton from './CustomButton';

import { HiMiniComputerDesktop } from "react-icons/hi2";
import { MdPerson2 } from 'react-icons/md';

function PlayMode() {

  // define state
  const [isModalOpen, setIsModalOpen] = useState(true);

  // close modal function
  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <Modal isOpen={isModalOpen} size={"xl"} onClose={closeModal} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>

          <Heading mt={5} textAlign="center" color="brand.300"> Welcome To Tic-Tac-Toe </Heading>

          <Flex
            p={5}
            textAlign="center"
            flexWrap="wrap"
            justifyContent="center"
            width={{ base: "100%", md: "auto" }}
            my={{ base: 4, md: 0 }}
          >
            <CustomButton icon={HiMiniComputerDesktop} closeModal={closeModal} text="Play With Computer" />
            <CustomButton icon={MdPerson2} closeModal={closeModal} text="Play With Friend Locally" />
          </Flex>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PlayMode;
