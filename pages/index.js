import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Chatbot from '../components/chatbot';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div>
        <h1>Zap Chatbot</h1>
        <Chatbot />  
      </div>
    </>
  );
}
