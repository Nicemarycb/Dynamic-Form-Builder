import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, Card, Button, Alert } from 'react-bootstrap';

export default function LivePreview() {
  const { fields, formTitle, conditionalRules } = useSelector((state) => state.form);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Initialize form values
    const initialValues = {};
    fields.forEach(field => {
      switch(field.type) {
        case 'checkbox':
          initialValues[field.id] = field.defaultChecked || false;
          break;
        case 'radio':
          initialValues[field.id] = field.options?.[0] || '';
          break;
        case 'dropdown':
          initialValues[field.id] = '';
          break;
        default:
          initialValues[field.id] = '';
      }
    });
    setFormValues(initialValues);
  }, [fields]);

  const evaluateCondition = (rule) => {
    const conditionValue = formValues[rule.conditionFieldId];
    
    switch(rule.operator) {
      case 'equals':
        return conditionValue === rule.value;
      case 'notEquals':
        return conditionValue !== rule.value;
      case 'contains':
        return String(conditionValue).includes(rule.value);
      case 'greaterThan':
        return Number(conditionValue) > Number(rule.value);
      case 'lessThan':
        return Number(conditionValue) < Number(rule.value);
      case 'empty':
        return !conditionValue || conditionValue === '';
      case 'notEmpty':
        return !!conditionValue && conditionValue !== '';
      default:
        return false;
    }
  };

  const isFieldVisible = (fieldId) => {
    const hideRules = conditionalRules.filter(
      rule => rule.targetFieldId === fieldId && rule.action === 'hide'
    );
    const showRules = conditionalRules.filter(
      rule => rule.targetFieldId === fieldId && rule.action === 'show'
    );

    
    if (hideRules.some(evaluateCondition)) {
      return false;
    }

  
    if (showRules.length > 0) {
      return showRules.some(evaluateCondition);
    }

    return true;
  };

  const isFieldEnabled = (fieldId) => {
    const disableRules = conditionalRules.filter(
      rule => rule.targetFieldId === fieldId && rule.action === 'disable'
    );
    const enableRules = conditionalRules.filter(
      rule => rule.targetFieldId === fieldId && rule.action === 'enable'
    );

   
    if (disableRules.some(evaluateCondition)) {
      return false;
    }

   
    if (enableRules.length > 0) {
      return enableRules.some(evaluateCondition);
    }

  
    return true;
  };

  const validateField = (fieldId, value) => {
    const field = fields.find(f => f.id === fieldId);
    if (!field) return null;

    const fieldErrors = [];

    // Required validation
    if (field.required && (!value || value === '')) {
      fieldErrors.push('This field is required');
    }

    // Type-specific validation
    if (field.validation) {
      // Min/Max validation
      if (field.validation.min !== undefined && value !== '') {
        if (field.type === 'number' && Number(value) < Number(field.validation.min)) {
          fieldErrors.push(`Minimum value is ${field.validation.min}`);
        } else if (field.type === 'text' && value.length < Number(field.validation.min)) {
          fieldErrors.push(`Minimum length is ${field.validation.min}`);
        }
      }

      if (field.validation.max !== undefined && value !== '') {
        if (field.type === 'number' && Number(value) > Number(field.validation.max)) {
          fieldErrors.push(`Maximum value is ${field.validation.max}`);
        } else if (field.type === 'text' && value.length > Number(field.validation.max)) {
          fieldErrors.push(`Maximum length is ${field.validation.max}`);
        }
      }

      // Pattern validation
      if (field.validation.pattern && value !== '') {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(value)) {
          fieldErrors.push(field.validation.errorMessage || 'Invalid format');
        }
      }

      // Email validation
      if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          fieldErrors.push('Please enter a valid email address');
        }
      }
    }

    return fieldErrors.length > 0 ? fieldErrors : null;
  };

  const handleChange = (fieldId, value) => {
    setFormValues(prev => ({ ...prev, [fieldId]: value }));
    
    // Validate on change
    const fieldErrors = validateField(fieldId, value);
    setErrors(prev => ({
      ...prev,
      [fieldId]: fieldErrors
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    let hasErrors = false;

    fields.forEach(field => {
      if (isFieldVisible(field.id) && isFieldEnabled(field.id)) {
        const fieldErrors = validateField(field.id, formValues[field.id]);
        if (fieldErrors) {
          newErrors[field.id] = fieldErrors;
          hasErrors = true;
        }
      }
    });

    setErrors(newErrors);
    
    if (!hasErrors) {
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      console.log('Form submitted:', formValues);
    }
  };

  const renderField = (field) => {
    if (!isFieldVisible(field.id)) return null;

    const isEnabled = isFieldEnabled(field.id);
    const fieldErrors = errors[field.id];

    const commonProps = {
      disabled: !isEnabled,
      isInvalid: !!fieldErrors,
      className: isEnabled ? '' : 'text-muted bg-light'
    };

    switch(field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <Form.Group key={field.id} className="mb-3">
            <Form.Label>
              {field.label} {field.required && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Control
              type={field.type}
              placeholder={field.placeholder}
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              {...commonProps}
            />
            {fieldErrors && fieldErrors.map((error, i) => (
              <Form.Text key={i} className="text-danger">
                {error}
              </Form.Text>
            ))}
          </Form.Group>
        );

      case 'date':
        return (
          <Form.Group key={field.id} className="mb-3">
            <Form.Label>
              {field.label} {field.required && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Control
              type="date"
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              {...commonProps}
            />
          </Form.Group>
        );

      case 'checkbox':
        return (
          <Form.Group key={field.id} className="mb-3">
            <Form.Check
              type="checkbox"
              label={field.label}
              checked={formValues[field.id] || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              {...commonProps}
            />
          </Form.Group>
        );

      case 'radio':
        return (
          <Form.Group key={field.id} className="mb-3">
            <Form.Label>
              {field.label} {field.required && <span className="text-danger">*</span>}
            </Form.Label>
            {field.options?.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                name={field.id}
                label={option}
                value={option}
                checked={formValues[field.id] === option}
                onChange={(e) => handleChange(field.id, e.target.value)}
                {...commonProps}
              />
            ))}
          </Form.Group>
        );

      case 'dropdown':
        return (
          <Form.Group key={field.id} className="mb-3">
            <Form.Label>
              {field.label} {field.required && <span className="text-danger">*</span>}
            </Form.Label>
            <Form.Select
              value={formValues[field.id] || ''}
              onChange={(e) => handleChange(field.id, e.target.value)}
              {...commonProps}
            >
              <option value="">Select an option</option>
              {field.options?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        );

      default:
        return null;
    }
  };

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">{formTitle}</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {fields.map(renderField)}
          
          {isSubmitted && (
            <Alert variant="success" className="mt-3">
              Form submitted successfully! Check console for data.
            </Alert>
          )}
          
          <Button 
            type="submit" 
            variant="primary" 
            className="mt-3"
            disabled={Object.keys(formValues).length === 0}
          >
            Submit Form
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}