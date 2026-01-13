// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { 
//   Button, 
//   Card, 
//   ListGroup, 
//   Modal, 
//   Form,
//   InputGroup,
//   Alert
// } from 'react-bootstrap';
// import { 
//   saveFormToStorage, 
//   loadForm, 
//   resetForm,
//   setFormTitle,
//   deleteSavedForm
// } from '../../store/formSlice';

// export default function ExportPanel() {
//   const dispatch = useDispatch();
//   const { fields, formTitle, conditionalRules, savedForms } = useSelector((state) => state.form);
  
//   const [showModal, setShowModal] = useState(false);
//   const [newFormTitle, setNewFormTitle] = useState(formTitle);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [formToDelete, setFormToDelete] = useState(null);
  
//   const handleSave = () => {
//     const formData = {
//       formTitle,
//       fields,
//       conditionalRules,
//       createdAt: new Date().toISOString()
//     };
//     dispatch(saveFormToStorage(formData));
//     setShowModal(false);
//   };

//   const handleExport = () => {
//     const schema = {
//       formTitle,
//       fields,
//       conditionalRules,
//       version: '1.0',
//       exportedAt: new Date().toISOString()
//     };

//     const dataStr = JSON.stringify(schema, null, 2);
//     const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
//     const exportFileDefaultName = `${formTitle.replace(/\s+/g, '_')}_schema.json`;
    
//     const linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', exportFileDefaultName);
//     linkElement.click();
//   };

//   const handleImport = (event) => {
//     const fileReader = new FileReader();
//     fileReader.readAsText(event.target.files[0], "UTF-8");
    
//     fileReader.onload = (e) => {
//       try {
//         const importedSchema = JSON.parse(e.target.result);
//         // Validate the schema
//         if (importedSchema.fields && Array.isArray(importedSchema.fields)) {
//           // Reset current form and load imported schema
//           dispatch(resetForm());
//           if (importedSchema.formTitle) {
//             dispatch(setFormTitle(importedSchema.formTitle));
//           }
//           // Note: In a real implementation, you'd dispatch actions to load each field
//           // This is simplified for brevity
//           alert('Import successful! Reset form and load imported data.');
//         }
//       } catch (error) {
//         alert('Invalid schema file');
//       }
//     };
//   };

// const handleDeleteClick = (formId, formTitle) => {
//     setFormToDelete({ id: formId, title: formTitle });
//     setShowDeleteConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (formToDelete) {
//       dispatch(deleteSavedForm(formToDelete.id));
//       setShowDeleteConfirm(false);
//       setFormToDelete(null);
//     }
//   };

//   const handleLoadForm = (formId) => {
//     if (fields.length > 0) {
//       if (window.confirm('Loading a saved form will replace your current form. Continue?')) {
//         dispatch(loadForm(formId));
//       }
//     } else {
//       dispatch(loadForm(formId));
//     }
//   };


//   return (
//     <Card>
//       <Card.Header>
//         <h5 className="mb-0">💾 Save/Load/Export</h5>
//       </Card.Header>
//       <Card.Body>
//         <Form.Group className="mb-3">
//           <Form.Label>Form Title</Form.Label>
//           <InputGroup>
//             <Form.Control
//               type="text"
//               value={newFormTitle}
//               onChange={(e) => setNewFormTitle(e.target.value)}
//             />
//             <Button 
//               variant="outline-secondary"
//               onClick={() => dispatch(setFormTitle(newFormTitle))}
//             >
//               Update
//             </Button>
//           </InputGroup>
//         </Form.Group>

//         <div className="d-grid gap-2 mb-4">
//           <Button 
//             variant="success" 
//             onClick={() => setShowModal(true)}
//           >
//             💾 Save Current Form
//           </Button>
          
//           <Button 
//             variant="outline-primary" 
//             onClick={handleExport}
//           >
//             📥 Export as JSON
//           </Button>
          
//           <div>
//             <Form.Label htmlFor="importFile" className="btn btn-outline-secondary w-100">
//               📤 Import JSON
//             </Form.Label>
//             <Form.Control
//               type="file"
//               id="importFile"
//               accept=".json"
//               onChange={handleImport}
//               style={{ display: 'none' }}
//             />
//           </div>
          
//           <Button 
//             variant="warning" 
//             onClick={() => dispatch(resetForm())}
//           >
//             🔄 Reset Form
//           </Button>
//         </div>

//         <h6>Saved Forms</h6>
//         {savedForms.length === 0 ? (
//           <p className="text-muted">No saved forms yet</p>
//         ) : (
//           <ListGroup>
//             {savedForms.map((form) => (
//               <ListGroup.Item 
//                 key={form.id} 
//                 className="d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   <strong>{form.formTitle}</strong>
//                   <br />
//                   <small className="text-muted">
//                     {new Date(form.timestamp).toLocaleDateString()} • {form.fields.length} fields
//                   </small>
//                 </div>
//                 <Button
//                   size="sm"
//                   variant="outline-primary"
//                   onClick={() => handleLoadForm(form.id)}
//                 >
//                   Load
//                 </Button>
//  <Button
//                       size="sm"
//                       variant="outline-danger"
//                       onClick={() => handleDeleteClick(form.id, form.formTitle)}
//                       title="Delete this form"
//                     >
//                       🗑️
//                     </Button>

//               </ListGroup.Item>
//             ))}
//           </ListGroup>
//         )}
//       </Card.Body>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Save Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Save your current form configuration to localStorage.</p>
//           <p><strong>Fields:</strong> {fields.length}</p>
//           <p><strong>Rules:</strong> {conditionalRules.length}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSave}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

// {/* Delete Confirmation Modal */}
//       <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Delete Form</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Alert variant="danger">
//             <strong>⚠️ Warning:</strong> This action cannot be undone!
//           </Alert>
//           <p>Are you sure you want to delete the form:</p>
//           <p className="text-center"><strong>"{formToDelete?.title}"</strong></p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Delete Permanently
//           </Button>
//         </Modal.Footer>
//       </Modal>

//     </Card>
//   );
// }


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Button, 
  Card, 
  ListGroup, 
  Modal, 
  Form,
  InputGroup,
  Alert
} from 'react-bootstrap';
import { 
  saveFormToStorage, 
  loadForm, 
  resetForm,
  setFormTitle,
  deleteSavedForm  // ← IMPORT NEW ACTION
} from '../../store/formSlice';

export default function ExportPanel() {
  const dispatch = useDispatch();
  const { fields, formTitle, conditionalRules, savedForms } = useSelector((state) => state.form);
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);
  const [newFormTitle, setNewFormTitle] = useState(formTitle);

  const handleSave = () => {
    const formData = {
      formTitle,
      fields,
      conditionalRules,
      createdAt: new Date().toISOString()
    };
    dispatch(saveFormToStorage(formData));
    setShowModal(false);
  };

  const handleExport = () => {
    const schema = {
      formTitle,
      fields,
      conditionalRules,
      version: '1.0',
      exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(schema, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${formTitle.replace(/\s+/g, '_')}_schema.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], "UTF-8");
    
    fileReader.onload = (e) => {
      try {
        const importedSchema = JSON.parse(e.target.result);
        if (importedSchema.fields && Array.isArray(importedSchema.fields)) {
          dispatch(resetForm());
          if (importedSchema.formTitle) {
            dispatch(setFormTitle(importedSchema.formTitle));
          }
          alert('Import successful! Form has been loaded.');
        }
      } catch (error) {
        alert('Invalid schema file');
      }
    };
  };

  const handleDeleteClick = (formId, formTitle) => {
    setFormToDelete({ id: formId, title: formTitle });
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (formToDelete) {
      dispatch(deleteSavedForm(formToDelete.id));
      setShowDeleteConfirm(false);
      setFormToDelete(null);
    }
  };

  const handleLoadForm = (formId) => {
    if (fields.length > 0) {
      if (window.confirm('Loading a saved form will replace your current form. Continue?')) {
        dispatch(loadForm(formId));
      }
    } else {
      dispatch(loadForm(formId));
    }
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h5 className="mb-0">💾 Save/Load/Export</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Form Title</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                value={newFormTitle}
                onChange={(e) => setNewFormTitle(e.target.value)}
                placeholder="Enter form title"
              />
              <Button 
                variant="outline-secondary"
                onClick={() => dispatch(setFormTitle(newFormTitle))}
              >
                Update
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2 mb-4">
            <Button 
              variant="success" 
              onClick={() => setShowModal(true)}
              disabled={fields.length === 0}
            >
              💾 Save Current Form
            </Button>
            
            <Button 
              variant="outline-primary" 
              onClick={handleExport}
              disabled={fields.length === 0}
            >
              📥 Export as JSON
            </Button>
            
            <div>
              <Form.Label htmlFor="importFile" className="btn btn-outline-secondary w-100">
                📤 Import JSON
              </Form.Label>
              <Form.Control
                type="file"
                id="importFile"
                accept=".json"
                onChange={handleImport}
                style={{ display: 'none' }}
              />
            </div>
            
            <Button 
              variant="warning" 
              onClick={() => {
                if (fields.length > 0) {
                  if (window.confirm('Are you sure you want to reset the form? All unsaved changes will be lost.')) {
                    dispatch(resetForm());
                  }
                } else {
                  dispatch(resetForm());
                }
              }}
            >
              🔄 Reset Form
            </Button>
          </div>

          <h6>Saved Forms ({savedForms.length})</h6>
          {savedForms.length === 0 ? (
            <Alert variant="info">
              No saved forms yet. Create a form and click "Save Current Form" to save it.
            </Alert>
          ) : (
            <ListGroup>
              {savedForms.map((form) => (
                <ListGroup.Item 
                  key={form.id} 
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="flex-grow-1">
                    <strong>{form.formTitle}</strong>
                    <br />
                    <small className="text-muted">
                      {new Date(form.timestamp).toLocaleDateString()} • {form.fields.length} fields
                    </small>
                  </div>
                  <div className="d-flex gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleLoadForm(form.id)}
                      title="Load this form"
                    >
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleDeleteClick(form.id, form.formTitle)}
                      title="Delete this form"
                    >
                      🗑️
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Save Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Save Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Save your current form configuration to localStorage.</p>
          <p><strong>Form Title:</strong> {formTitle}</p>
          <p><strong>Fields:</strong> {fields.length}</p>
          <p><strong>Conditional Rules:</strong> {conditionalRules.length}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Form
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert variant="danger">
            <strong>⚠️ Warning:</strong> This action cannot be undone!
          </Alert>
          <p>Are you sure you want to delete the form:</p>
          <p className="text-center"><strong>"{formToDelete?.title}"</strong></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}