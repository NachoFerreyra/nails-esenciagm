import NailsCard from "@/components/presentation/NailsCard/NailsCard";
import styles from "./App.module.scss";

const App = () => {
  return (
    <main className={styles["app-shell"]}>
      <NailsCard />
    </main>
  );
};

export default App;
