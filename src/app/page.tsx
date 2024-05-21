import { UserCreation } from "./components/UserCreation/UserCreation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <UserCreation />
    </main>
  );
}
