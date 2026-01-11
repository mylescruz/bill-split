import { Navbar } from "react-bootstrap";
import styles from "@/styles/layout/header.module.css";

export default function Header() {
  return (
    <Navbar className={styles.navbar}>
      <Navbar.Brand href="/" className={`${styles.title} mx-auto`}>
        Bill Splitter
      </Navbar.Brand>
    </Navbar>
  );
}
