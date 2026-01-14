
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  addField, 
  reorderFields, 
  deleteField 
} from '../../store/formSlice';

const fieldTypes = [
  { type: 'text', label: ' Text',  },
  { type: 'email', label: ' Email',  },
  { type: 'number', label: ' Number',  },
  { type: 'date', label: ' Date',  },
  { type: 'checkbox', label: ' Checkbox', },
  { type: 'radio', label: ' Radio Group',  },
  { type: 'dropdown', label: 'Dropdown',  },
];

function SortableFieldItem({ field, onSelect, isSelected }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dispatch = useDispatch();

  const getFieldIcon = (type) => {
    const fieldType = fieldTypes.find(ft => ft.type === type);
    return fieldType ? fieldType.icon : '?';
  };

  const handleDelete = (e) => {
    e.stopPropagation(); 
    e.preventDefault();  
    console.log(' DELETE CLICKED - Field ID:', field.id);
    dispatch(deleteField(field.id)); 
  };

  const handleSelect = () => {
    console.log(' Selecting field:', field.id);
    onSelect(field.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`list-group-item d-flex justify-content-between align-items-center ${
        isSelected ? 'active bg-primary text-white' : ''
      }`}
    >
      {/* Clickable area for selection */}
      <div 
        className="d-flex align-items-center flex-grow-1"
        style={{ cursor: 'pointer' }}
        onClick={handleSelect}
      >
        <span className="me-2">{getFieldIcon(field.type)}</span>
        <span>{field.label || `Unnamed ${field.type} field`}</span>
      </div>
      
      {/* Drag handle - separate from delete button */}
      <div
        style={{ cursor: 'grab', padding: '0 10px' }}
        {...attributes}
        {...listeners}
        className="drag-handle"
      >
        ⋮⋮
      </div>
      
      {/* Delete button */}
      <button
        type="button"
        className="btn btn-outline-danger btn-sm delete-btn"
        onClick={handleDelete}
        style={{ flexShrink: 0 }}
        aria-label="Delete field"
        title="Delete field"
      >
        ×
      </button>
    </div>
  );
}

export default function FieldList({ onSelectField, selectedFieldId }) {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);

  console.log(' Current fields in Redux:', fields);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      dispatch(reorderFields({ activeId: active.id, overId: over.id }));
    }
  };

  const handleAddField = (type) => {
    console.log(' Adding field type:', type);
    dispatch(addField({ type }));
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Add Fields</h5>
        <small>{fields.length} fields</small>
      </Card.Header>
      <Card.Body>
        <div className="d-grid gap-2 mb-3">
          {fieldTypes.map((fieldType) => (
            <Button
              key={fieldType.type}
              variant="outline-primary"
              size="sm"
              onClick={() => handleAddField(fieldType.type)}
            >
              {fieldType.label}
            </Button>
          ))}
        </div>

        <h6>Field Order (Drag to reorder)</h6>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={fields.map(f => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="list-group">
              {fields.map((field) => (
                <SortableFieldItem
                  key={field.id}
                  field={field}
                  onSelect={onSelectField}
                  isSelected={selectedFieldId === field.id}
                />
              ))}
              {fields.length === 0 && (
                <div className="list-group-item text-muted text-center">
                  No fields added yet. Click buttons above to add fields.
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </Card.Body>
    </Card>
  );
}