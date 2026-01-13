// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useState } from 'react';
// import { Container, Row, Col, Tabs, Tab, Nav } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Provider } from 'react-redux';
// import { store } from './store/store';
// import FieldList from './components/FormBuilder/FieldList';
// import FieldConfig from './components/FormBuilder/FieldConfig';
// import LivePreview from './components/FormBuilder/LivePreview';
// import ConditionalLogic from './components/FormBuilder/ConditionalLogic';
// import ExportPanel from './components/FormBuilder/ExportPanel';

// function App() {
//   const [selectedFieldId, setSelectedFieldId] = useState(null);
//   const [activeTab, setActiveTab] = useState('fields');

//   return (
//     <Provider store={store}>
//       <Container fluid className="mt-3">
//         <h1 className="mb-4">🧙‍♂️ Form Builder Pro</h1>
        
//         <Row>
//           <Col md={4}>
//             <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
//               <Tab eventKey="fields" title="🏗️ Fields">
// <FieldList 
//   onSelectField={setSelectedFieldId}
//   selectedFieldId={selectedFieldId}
// />              </Tab>
//               <Tab eventKey="logic" title="🔮 Logic">
//                 <ConditionalLogic />
//               </Tab>
//               <Tab eventKey="export" title="💾 Save/Load">
//                 <ExportPanel />
//               </Tab>
//             </Tabs>
//           </Col>
          
//           <Col md={4}>
//             <h3>⚙️ Configuration</h3>
//             {selectedFieldId ? (
//               <FieldConfig fieldId={selectedFieldId} />
//             ) : (
//               <div className="alert alert-info">
//                 Select a field from the left panel to configure it
//               </div>
//             )}
//           </Col>
          
//           <Col md={4}>
//             <h3>👀 Live Preview</h3>
//             <LivePreview />
//           </Col>
//         </Row>
//       </Container>
//     </Provider>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { setSelectedField } from './store/formSlice'; // ← IMPORT ACTION
import FieldList from './components/FormBuilder/FieldList';
import FieldConfig from './components/FormBuilder/FieldConfig';
import LivePreview from './components/FormBuilder/LivePreview';
import ConditionalLogic from './components/FormBuilder/ConditionalLogic';
import ExportPanel from './components/FormBuilder/ExportPanel';

function AppContent() {
  const dispatch = useDispatch();
  const selectedFieldId = useSelector((state) => state.form.selectedFieldId); // ← GET FROM REDUX
  const [activeTab, setActiveTab] = useState('fields');

  const handleSelectField = (fieldId) => {
    dispatch(setSelectedField(fieldId)); // ← DISPATCH TO REDUX
  };

  return (
    <Container fluid className="mt-3">
      <h1 className="mb-4">🧙‍♂️ Form Builder Pro</h1>
      
      <Row>
        <Col md={4}>
          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
            <Tab eventKey="fields" title="🏗️ Fields">
              <FieldList onSelectField={handleSelectField} />
            </Tab>
            <Tab eventKey="logic" title="🔮 Logic">
              <ConditionalLogic />
            </Tab>
            <Tab eventKey="export" title="💾 Save/Load">
              <ExportPanel />
            </Tab>
          </Tabs>
        </Col>
        
        <Col md={4}>
          <h3>⚙️ Configuration</h3>
          {selectedFieldId ? (
            <FieldConfig fieldId={selectedFieldId} />
          ) : (
            <div className="alert alert-info">
              Select a field from the left panel to configure it
            </div>
          )}
        </Col>
        
        <Col md={4}>
          <h3>👀 Live Preview</h3>
          <LivePreview />
        </Col>
      </Row>
    </Container>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;