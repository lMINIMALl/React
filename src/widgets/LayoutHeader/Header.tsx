import React, { useState } from "react";
import { ThemeSwitcher } from "../../features/ThemeSwitcher/ui/ThemeSwitcher";
import { Modal } from "../../shared/ui/Modal/Modal";
import { Button } from "../../shared/ui/Button/Button";

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header>
      <Button onClick={() => setIsModalOpen(true)}>О проекте</Button>
      <ThemeSwitcher />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

export default Header;
