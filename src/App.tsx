import React from "react";

interface AppProps {
  lang: string | null;
}

const App: React.FC<AppProps> = ({ lang }) => {
  return (
    <div>
      <h1>{lang === "ukrainian" ? "Привіт Світ" : "Hello World"}</h1>
    </div>
  );
};

export default App;
