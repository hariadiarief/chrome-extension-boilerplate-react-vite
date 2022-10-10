import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    console.log("content view loaded");
  }, []);

  useEffect(() => {
    // chrome.storage.sync.set({
    //   title: document.getElementsByTagName("h1")[0].textContent
    // });

  }, [])


  return <div className="content-view">content view</div>;
}
