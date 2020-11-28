
import './App.css';
import 'antd/dist/antd.css';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import { Row, Col } from 'antd';

import Todos from './components/Todos';
import Tasks from './components/Tasks';

function App() {
  return (
    <Router>
      <Row>
        <Col span={12} offset={6}>
          <Switch>
            <Route path="/todos">
              <Todos />
            </Route>
            <Route path="/todo/:id">
              <Tasks />
            </Route>
            <Route>
              <Redirect to="/todos" />
            </Route>
          </Switch>
        </Col>
      </Row>
    </Router>
  );
}

export default App;
