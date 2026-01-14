import React, { useState } from 'react';
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { store } from './store/store';
import { setSelectedField } from './store/formSlice';
import FieldList from './components/FormBuilder/FieldList';
import FieldConfig from './components/FormBuilder/FieldConfig';
import LivePreview from './components/FormBuilder/LivePreview';
import ConditionalLogic from './components/FormBuilder/ConditionalLogic';
import ExportPanel from './components/FormBuilder/ExportPanel';
import ThemeToggle from './components/FormBuilder/ThemeToggle'; 
import DarkModeWrapper from './components/FormBuilder/DarkModeWrapper'; 

function AppContent() {
  const dispatch = useDispatch();
  const selectedFieldId = useSelector((state) => state.form.selectedFieldId);
  const [activeTab, setActiveTab] = useState('fields');

  const handleSelectField = (fieldId) => {
    dispatch(setSelectedField(fieldId));
  };

  return (
    <DarkModeWrapper>
      <Container fluid className="mt-3">
        <Row className="mb-3 align-items-center">
          <Col>
            <h1 className="mb-0 text-primary"> Dynamic Form Builder</h1>
          </Col>
          <Col xs="auto">
            <ThemeToggle />
          </Col>
        </Row>
        
        <Row>
          <Col md={4}>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
              <Tab eventKey="fields" title="Fields">
                <FieldList onSelectField={handleSelectField} />
              </Tab>
              <Tab eventKey="logic" title="Logic">
                <ConditionalLogic />
              </Tab>
              <Tab eventKey="export" title="Save/Load">
                <ExportPanel />
              </Tab>
            </Tabs>
          </Col>
          
          <Col md={4}>
            <h3>Configuration</h3>
            {selectedFieldId ? (
              <FieldConfig fieldId={selectedFieldId} />
            ) : (
              <div className="alert alert-info">
                Select a field from the left panel to configure it
              </div>
            )}
          </Col>
          
          <Col md={4}>
            <h3>Live Preview</h3>
            <LivePreview />
          </Col>
        </Row>
      </Container>
    </DarkModeWrapper>
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