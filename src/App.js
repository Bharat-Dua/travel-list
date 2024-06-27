import "./index.css";
function Logo() {
  return <h1>FAR AWAY</h1>;
}
function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  );
}
function PackingList() {
  return <div className="list">PackingList</div>;
}
function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed X </em>
    </footer>
  );
}
function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;
