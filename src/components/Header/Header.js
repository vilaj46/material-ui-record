import React from "react";
import { useFile } from "../Context/FileProvider";

// Dropdown Menus
import FileDropdown from "./DropdownMenus/FileDropdown/FileDropdown";
import DocumentDropdown from "./DropdownMenus/DocumentDropdown/DocumentDropdown";

import styles from "./Header.module.css";

export default function Header() {
  const file = useFile();

  return (
    <header className={styles.header}>
      <FileDropdown />
      <DocumentDropdown />
      <h1 className={styles.fileName}>{file.name}</h1>
    </header>
  );
}
