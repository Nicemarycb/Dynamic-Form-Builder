import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import { 
  addConditionalRule, 
  updateConditionalRule, 
  deleteConditionalRule 
} from '../../store/formSlice';

export default function ConditionalLogic() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const rules = useSelector((state) => state.form.conditionalRules);
  
  const [newRule, setNewRule] = useState({
    targetFieldId: '',
    conditionFieldId: '',
    operator: 'equals',
    value: '',
    action: 'show' // show, hide, enable, disable
  });

  const handleAddRule = () => {
    if (newRule.targetFieldId && newRule.conditionFieldId) {
      dispatch(addConditionalRule(newRule));
      setNewRule({
        targetFieldId: '',
        conditionFieldId: '',
        operator: 'equals',
        value: '',
        action: 'show'
      });
    }
  };

  const getFieldOptions = (excludeId = null) => 
    fields
      .filter(f => !excludeId || f.id !== excludeId)
      .map(field => ({
        value: field.id,
        label: `${field.label} (${field.type})`
      }));

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">🔮 Conditional Logic</h5>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Target Field (Affected)</Form.Label>
            <Form.Select
              value={newRule.targetFieldId}
              onChange={(e) => setNewRule({...newRule, targetFieldId: e.target.value})}
            >
              <option value="">Select target field</option>
              {getFieldOptions().map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Condition Field (Trigger)</Form.Label>
            <Form.Select
              value={newRule.conditionFieldId}
              onChange={(e) => setNewRule({...newRule, conditionFieldId: e.target.value})}
            >
              <option value="">Select condition field</option>
              {getFieldOptions(newRule.targetFieldId).map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <InputGroup className="mb-3">
            <Form.Select
              value={newRule.operator}
              onChange={(e) => setNewRule({...newRule, operator: e.target.value})}
              style={{ maxWidth: '150px' }}
            >
              <option value="equals">equals</option>
              <option value="notEquals">not equals</option>
              <option value="contains">contains</option>
              <option value="greaterThan">&gt;</option>
              <option value="lessThan">&lt;</option>
              <option value="empty">is empty</option>
              <option value="notEmpty">is not empty</option>
            </Form.Select>
            <Form.Control
              type="text"
              placeholder="Value"
              value={newRule.value}
              onChange={(e) => setNewRule({...newRule, value: e.target.value})}
              disabled={['empty', 'notEmpty'].includes(newRule.operator)}
            />
          </InputGroup>

          <Form.Group className="mb-3">
            <Form.Label>Action</Form.Label>
            <Form.Select
              value={newRule.action}
              onChange={(e) => setNewRule({...newRule, action: e.target.value})}
            >
              <option value="show">Show field</option>
              <option value="hide">Hide field</option>
              <option value="enable">Enable field</option>
              <option value="disable">Disable field</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            onClick={handleAddRule}
            disabled={!newRule.targetFieldId || !newRule.conditionFieldId}
          >
            Add Rule
          </Button>
        </Form>

        <hr className="my-4" />

        <h6>Active Rules</h6>
        {rules.length === 0 ? (
          <p className="text-muted">No conditional rules defined</p>
        ) : (
          rules.map((rule) => {
            const targetField = fields.find(f => f.id === rule.targetFieldId);
            const conditionField = fields.find(f => f.id === rule.conditionFieldId);
            
            return (
              <Card key={rule.id} className="mb-2">
                <Card.Body className="py-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <small>
                        <strong>{targetField?.label || 'Unknown field'}</strong> 
                        {' will be '}
                        <strong>{rule.action}</strong>
                        {' when '}
                        <strong>{conditionField?.label || 'Unknown field'}</strong>
                        {' '}{rule.operator} {rule.value}
                      </small>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => dispatch(deleteConditionalRule(rule.id))}
                    >
                      ×
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })
        )}
      </Card.Body>
    </Card>
  );
}