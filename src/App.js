import "./App.css";
import "semantic-ui-css/semantic.min.css";

import { Routes, Route } from "react-router-dom";

import { Container } from "semantic-ui-react";

import Header from "./components/Header";
import Main from "./components/Main";
import CreateCampaign from "./components/CreateCampaign";
import SingleCampaign from "./components/SingleCampaign";
import SingleRequest from "./components/SingleRequest";

function App() {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/campaigns/new" element={<CreateCampaign />} />
        <Route path="/campaign/:address" element={<SingleCampaign />} />
        <Route
          path="/campaign/:address/requests/:urlRequestId"
          exact
          element={<SingleRequest />}
        />
        <Route path="/" element={<Main />} />
      </Routes>
    </Container>
  );
}

export default App;
