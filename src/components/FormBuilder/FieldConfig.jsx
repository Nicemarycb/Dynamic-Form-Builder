import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Card, Button, InputGroup } from 'react-bootstrap';
import { updateField } from '../../store/formSlice';

export default function FieldConfig({ fieldId }) {
  const dispatch = useDispatch();
  const field = useSelector((state) => 
    state.form.fields.find(f => f.id === fieldId)
  );

  if (!field) {
    return (
      <Card>
        <Card.Body>
          <p className="text-muted">Select a field to configure</p>
        </Card.Body>
      </Card>
    );
  }

  const handleChange = (key, value) => {
    dispatch(updateField({ 
      id: fieldId, 
      updates: { [key]: value } 
    }));
  };

  const handleValidationChange = (key, value) => {
    const validation = { ...field.validation, [key]: value };
    dispatch(updateField({ 
      id: fieldId, 
      updates: { validation } 
    }));
  };

  const addOption = () => {
    const options = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    dispatch(updateField({ id: fieldId, updates: { options } }));
  };

  const updateOption = (index, value) => {
    const options = [...field.options];
    options[index] = value;
    dispatch(updateField({ id: fieldId, updates: { options } }));
  };

  const removeOption = (index) => {
    const options = field.options.filter((_, i) => i !== index);
    dispatch(updateField({ id: fieldId, updates: { options } }));
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Configure: {field.type.toUpperCase()} Field</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={field.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="Field label"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Placeholder</Form.Label>
            <Form.Control
              type="text"
              value={field.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              placeholder="“Start typing or panic” "
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="switch"
              label="Required Field"
              checked={field.required}
              onChange={(e) => handleChange('required', e.target.checked)}
            />
          </Form.Group>

          {(field.type === 'number' || field.type === 'text') && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Minimum Length/Value</Form.Label>
                <Form.Control
                  type="number"
                  value={field.validation?.min || ''}
                  onChange={(e) => handleValidationChange('min', e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Maximum Length/Value</Form.Label>
                <Form.Control
                  type="number"
                  value={field.validation?.max || ''}
                  onChange={(e) => handleValidationChange('max', e.target.value)}
                />
              </Form.Group>
            </>
          )}

          {(field.type === 'text' || field.type === 'email') && (
            <Form.Group className="mb-3">
              <Form.Label>Regular Expression Pattern</Form.Label>
              <Form.Control
                type="text"
                value={field.validation?.pattern || ''}
                onChange={(e) => handleValidationChange('pattern', e.target.value)}
                placeholder="^[A-Za-z]+$"
              />
              <Form.Text className="text-muted">
                Leave empty for no pattern validation
              </Form.Text>
            </Form.Group>
          )}

          {field.validation?.pattern && (
            <Form.Group className="mb-3">
              <Form.Label>Custom Error Message</Form.Label>
              <Form.Control
                type="text"
                value={field.validation?.errorMessage || ''}
                onChange={(e) => handleValidationChange('errorMessage', e.target.value)}
                placeholder="Invalid input"
              />
            </Form.Group>
          )}

          {(field.type === 'radio' || field.type === 'dropdown') && (
            <>
              <Form.Label>Options</Form.Label>
              {field.options?.map((option, index) => (
                <InputGroup className="mb-2" key={index}>
                  <Form.Control
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                  />
                  <Button
                    variant="outline-danger"
                    onClick={() => removeOption(index)}
                  >
                    Remove
                  </Button>
                </InputGroup>
              ))}
              <Button 
                variant="outline-success" 
                size="sm" 
                onClick={addOption}
                className="mt-2"
              >
                + Add Option
              </Button>
            </>
          )}

          {field.type === 'checkbox' && (
            <Form.Group className="mb-3">
              <Form.Label>Default Checked</Form.Label>
              <Form.Check
                type="switch"
                checked={field.defaultChecked || false}
                onChange={(e) => handleChange('defaultChecked', e.target.checked)}
              />
            </Form.Group>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
}