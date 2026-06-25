/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import { Home } from "./pages/Home";
import { TodayMatches } from "./pages/TodayMatches";
import { MatchDetails } from "./pages/MatchDetails";
import { About } from "./pages/About";
import { ApiTest } from "./pages/ApiTest";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/today" element={<TodayMatches />} />
            <Route path="/match/:id" element={<MatchDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/test" element={<ApiTest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
