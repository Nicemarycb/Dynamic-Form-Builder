// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Button, Card, ListGroup } from 'react-bootstrap';
// // import { 
// //   DndContext, 
// //   closestCenter,
// //   KeyboardSensor,
// //   PointerSensor,
// //   useSensor,
// //   useSensors,
// // } from '@dnd-kit/core';
// // import {
// //   arrayMove,
// //   SortableContext,
// //   sortableKeyboardCoordinates,
// //   verticalListSortingStrategy,
// // } from '@dnd-kit/sortable';
// // import { useSortable } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';
// // import { 
// //   addField, 
// //   reorderFields, 
// //   deleteField 
// // } from '../../store/formSlice';

// // const fieldTypes = [
// //   { type: 'text', label: '📝 Text', icon: 'T' },
// //   { type: 'email', label: '📧 Email', icon: 'E' },
// //   { type: 'number', label: '🔢 Number', icon: '#' },
// //   { type: 'date', label: '📅 Date', icon: 'D' },
// //   { type: 'checkbox', label: '☑️ Checkbox', icon: '✓' },
// //   { type: 'radio', label: '⭕ Radio Group', icon: '○' },
// //   { type: 'dropdown', label: '📋 Dropdown', icon: '▼' },
// // ];

// // function SortableFieldItem({ field, onSelect, isSelected }) {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //   } = useSortable({ id: field.id });

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     cursor: 'grab',
// //   };

// //   const dispatch = useDispatch();

// //   const getFieldIcon = (type) => {
// //     const fieldType = fieldTypes.find(ft => ft.type === type);
// //     return fieldType ? fieldType.icon : '?';
// //   };

// //   return (
// //     <ListGroup.Item
// //       ref={setNodeRef}
// //       style={style}
// //       {...attributes}
// //       {...listeners}
// //       action
// //       active={isSelected}
// //       onClick={() => onSelect(field.id)}
// //       className="d-flex justify-content-between align-items-center"
// //     >
// //       <div>
// //         <span className="me-2">{getFieldIcon(field.type)}</span>
// //         {field.label || `Unnamed ${field.type} field`}
// //       </div>
// //       <Button
// //         variant="outline-danger"
// //         size="sm"
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           dispatch(deleteField(field.id));
// //         }}
// //       >
// //         ×
// //       </Button>
// //     </ListGroup.Item>
// //   );
// // }

// // export default function FieldList({ onSelectField }) {
// //   const dispatch = useDispatch();
// //   const fields = useSelector((state) => state.form.fields);
// //   const selectedFieldId = useSelector((state) => state.form.selectedFieldId);

// //   const sensors = useSensors(
// //     useSensor(PointerSensor),
// //     useSensor(KeyboardSensor, {
// //       coordinateGetter: sortableKeyboardCoordinates,
// //     })
// //   );

// //   const handleDragEnd = (event) => {
// //     const { active, over } = event;

// //     if (active.id !== over.id) {
// //       dispatch(reorderFields({ activeId: active.id, overId: over.id }));
// //     }
// //   };

// //   return (
// //     <Card>
// //       <Card.Header className="d-flex justify-content-between align-items-center">
// //         <h5 className="mb-0">Add Fields</h5>
// //         <small>{fields.length} fields</small>
// //       </Card.Header>
// //       <Card.Body>
// //         <div className="d-grid gap-2 mb-3">
// //           {fieldTypes.map((fieldType) => (
// //             <Button
// //               key={fieldType.type}
// //               variant="outline-primary"
// //               size="sm"
// //               onClick={() => dispatch(addField({ type: fieldType.type }))}
// //             >
// //               {fieldType.label}
// //             </Button>
// //           ))}
// //         </div>

// //         <h6>Field Order (Drag to reorder)</h6>
        
// //         <DndContext
// //           sensors={sensors}
// //           collisionDetection={closestCenter}
// //           onDragEnd={handleDragEnd}
// //         >
// //           <SortableContext
// //             items={fields.map(f => f.id)}
// //             strategy={verticalListSortingStrategy}
// //           >
// //             <ListGroup>
// //               {fields.map((field) => (
// //                 <SortableFieldItem
// //                   key={field.id}
// //                   field={field}
// //                   onSelect={onSelectField}
// //                   isSelected={selectedFieldId === field.id}
// //                 />
// //               ))}
// //               {fields.length === 0 && (
// //                 <ListGroup.Item className="text-muted text-center">
// //                   No fields added yet. Click buttons above to add fields.
// //                 </ListGroup.Item>
// //               )}
// //             </ListGroup>
// //           </SortableContext>
// //         </DndContext>
// //       </Card.Body>
// //     </Card>
// //   );
// // }

// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Button, Card, ListGroup } from 'react-bootstrap';
// // import { 
// //   DndContext, 
// //   closestCenter,
// //   KeyboardSensor,
// //   PointerSensor,
// //   useSensor,
// //   useSensors,
// // } from '@dnd-kit/core';
// // import {
// //   arrayMove,
// //   SortableContext,
// //   sortableKeyboardCoordinates,
// //   verticalListSortingStrategy,
// // } from '@dnd-kit/sortable';
// // import { useSortable } from '@dnd-kit/sortable';
// // import { CSS } from '@dnd-kit/utilities';
// // import { 
// //   addField, 
// //   reorderFields, 
// //   deleteField 
// // } from '../../store/formSlice';

// // const fieldTypes = [
// //   { type: 'text', label: '📝 Text', icon: 'T' },
// //   { type: 'email', label: '📧 Email', icon: 'E' },
// //   { type: 'number', label: '🔢 Number', icon: '#' },
// //   { type: 'date', label: '📅 Date', icon: 'D' },
// //   { type: 'checkbox', label: '☑️ Checkbox', icon: '✓' },
// //   { type: 'radio', label: '⭕ Radio Group', icon: '○' },
// //   { type: 'dropdown', label: '📋 Dropdown', icon: '▼' },
// // ];

// // function SortableFieldItem({ field, onSelect, isSelected }) {
// //   const {
// //     attributes,
// //     listeners,
// //     setNodeRef,
// //     transform,
// //     transition,
// //   } = useSortable({ id: field.id });

// //   const style = {
// //     transform: CSS.Transform.toString(transform),
// //     transition,
// //     cursor: 'grab',
// //   };

// //   const dispatch = useDispatch();

// //   const getFieldIcon = (type) => {
// //     const fieldType = fieldTypes.find(ft => ft.type === type);
// //     return fieldType ? fieldType.icon : '?';
// //   };

// //   // FIXED: Proper click handler
// //   const handleClick = (e) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     console.log('Selecting field:', field.id); // Debug log
// //     onSelect(field.id); // This will call handleSelectField in App.js
// //   };

// //   return (
// //     <ListGroup.Item
// //       ref={setNodeRef}
// //       style={style}
// //       {...attributes}
// //       {...listeners}
// //       action
// //       active={isSelected}
// //       onClick={handleClick} // ← FIXED: Uses the handler
// //       className="d-flex justify-content-between align-items-center"
// //     >
// //       <div>
// //         <span className="me-2">{getFieldIcon(field.type)}</span>
// //         {field.label || `Unnamed ${field.type} field`}
// //       </div>
// //       <Button
// //         variant="outline-danger"
// //         size="sm"
// //         onClick={(e) => {
// //           e.stopPropagation();
// //           e.preventDefault();
// //           dispatch(deleteField(field.id));
// //         }}
// //       >
// //         ×
// //       </Button>
// //     </ListGroup.Item>
// //   );
// // }

// // export default function FieldList({ onSelectField }) {
// //   const dispatch = useDispatch();
// //   const fields = useSelector((state) => state.form.fields);
// //   const selectedFieldId = useSelector((state) => state.form.selectedFieldId);

// //   console.log('FieldList - selectedFieldId:', selectedFieldId); // Debug log
// //   console.log('FieldList - fields:', fields); // Debug log

// //   const sensors = useSensors(
// //     useSensor(PointerSensor),
// //     useSensor(KeyboardSensor, {
// //       coordinateGetter: sortableKeyboardCoordinates,
// //     })
// //   );

// //   const handleDragEnd = (event) => {
// //     const { active, over } = event;

// //     if (active.id !== over.id) {
// //       dispatch(reorderFields({ activeId: active.id, overId: over.id }));
// //     }
// //   };

// //   const handleAddField = (type) => {
// //     dispatch(addField({ type }));
// //   };

// //   return (
// //     <Card>
// //       <Card.Header className="d-flex justify-content-between align-items-center">
// //         <h5 className="mb-0">Add Fields</h5>
// //         <small>{fields.length} fields</small>
// //       </Card.Header>
// //       <Card.Body>
// //         <div className="d-grid gap-2 mb-3">
// //           {fieldTypes.map((fieldType) => (
// //             <Button
// //               key={fieldType.type}
// //               variant="outline-primary"
// //               size="sm"
// //               onClick={() => handleAddField(fieldType.type)}
// //             >
// //               {fieldType.label}
// //             </Button>
// //           ))}
// //         </div>

// //         <h6>Field Order (Drag to reorder)</h6>
        
// //         <DndContext
// //           sensors={sensors}
// //           collisionDetection={closestCenter}
// //           onDragEnd={handleDragEnd}
// //         >
// //           <SortableContext
// //             items={fields.map(f => f.id)}
// //             strategy={verticalListSortingStrategy}
// //           >
// //             <ListGroup>
// //               {fields.map((field) => (
// //                 <SortableFieldItem
// //                   key={field.id}
// //                   field={field}
// //                   onSelect={onSelectField}
// //                   isSelected={selectedFieldId === field.id}
// //                 />
// //               ))}
// //               {fields.length === 0 && (
// //                 <ListGroup.Item className="text-muted text-center">
// //                   No fields added yet. Click buttons above to add fields.
// //                 </ListGroup.Item>
// //               )}
// //             </ListGroup>
// //           </SortableContext>
// //         </DndContext>
// //       </Card.Body>
// //     </Card>
// //   );
// // }

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button, Card } from 'react-bootstrap';
// import { 
//   DndContext, 
//   closestCenter,
//   KeyboardSensor,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from '@dnd-kit/core';
// import {
//   arrayMove,
//   SortableContext,
//   sortableKeyboardCoordinates,
//   verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
// import { useSortable } from '@dnd-kit/sortable';
// import { CSS } from '@dnd-kit/utilities';
// import { 
//   addField, 
//   reorderFields, 
//   deleteField 
// } from '../../store/formSlice';

// const fieldTypes = [
//   { type: 'text', label: '📝 Text', icon: 'T' },
//   { type: 'email', label: '📧 Email', icon: 'E' },
//   { type: 'number', label: '🔢 Number', icon: '#' },
//   { type: 'date', label: '📅 Date', icon: 'D' },
//   { type: 'checkbox', label: '☑️ Checkbox', icon: '✓' },
//   { type: 'radio', label: '⭕ Radio Group', icon: '○' },
//   { type: 'dropdown', label: '📋 Dropdown', icon: '▼' },
// ];

// function SortableFieldItem({ field, onSelect, isSelected }) {
//   const {
//     attributes,
//     listeners,
//     setNodeRef,
//     transform,
//     transition,
//     isDragging,
//   } = useSortable({ id: field.id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const dispatch = useDispatch();

//   const getFieldIcon = (type) => {
//     const fieldType = fieldTypes.find(ft => ft.type === type);
//     return fieldType ? fieldType.icon : '?';
//   };

//   const handleDelete = (e) => {
//     e.stopPropagation();
//     e.preventDefault();
//     console.log('🗑️ Deleting field:', field.id);
//     dispatch(deleteField(field.id));
//   };

//   const handleSelect = (e) => {
//     // Don't select if clicking delete button
//     if (!e.target.closest('.btn-outline-danger')) {
//       console.log('👆 Selecting field:', field.id);
//       onSelect(field.id);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       className={`list-group-item d-flex justify-content-between align-items-center ${
//         isSelected ? 'active bg-primary text-white' : ''
//       } ${isDragging ? 'opacity-50' : ''}`}
//       onClick={handleSelect}
//     >
//       {/* Drag handle and content area */}
//       <div 
//         className="d-flex align-items-center flex-grow-1"
//         style={{ cursor: 'grab' }}
//         {...attributes}
//         {...listeners}
//       >
//         <span className="me-2">{getFieldIcon(field.type)}</span>
//         <span>{field.label || `Unnamed ${field.type} field`}</span>
//       </div>
      
//       {/* Delete button - NOT a Button component, just a button element */}
//       <button
//         type="button"
//         className="btn btn-outline-danger btn-sm"
//         onClick={handleDelete}
//         onMouseDown={(e) => e.stopPropagation()}
//         style={{ flexShrink: 0, marginLeft: '10px' }}
//         aria-label="Delete field"
//       >
//         ×
//       </button>
//     </div>
//   );
// }

// export default function FieldList({ onSelectField, selectedFieldId }) {
//   const dispatch = useDispatch();
//   const fields = useSelector((state) => state.form.fields);

//   console.log('DEBUG - FieldList fields count:', fields.length);

//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   const handleDragEnd = (event) => {
//     const { active, over } = event;

//     if (active.id !== over.id) {
//       dispatch(reorderFields({ activeId: active.id, overId: over.id }));
//     }
//   };

//   const handleAddField = (type) => {
//     console.log('➕ Adding field type:', type);
//     dispatch(addField({ type }));
//   };

//   return (
//     <Card>
//       <Card.Header className="d-flex justify-content-between align-items-center">
//         <h5 className="mb-0">Add Fields</h5>
//         <small>{fields.length} fields</small>
//       </Card.Header>
//       <Card.Body>
//         <div className="d-grid gap-2 mb-3">
//           {fieldTypes.map((fieldType) => (
//             <Button
//               key={fieldType.type}
//               variant="outline-primary"
//               size="sm"
//               onClick={() => handleAddField(fieldType.type)}
//             >
//               {fieldType.label}
//             </Button>
//           ))}
//         </div>

//         <h6>Field Order (Drag to reorder)</h6>
        
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//         >
//           <SortableContext
//             items={fields.map(f => f.id)}
//             strategy={verticalListSortingStrategy}
//           >
//             {/* Use plain div, NOT ListGroup component */}
//             <div className="list-group">
//               {fields.map((field) => (
//                 <SortableFieldItem
//                   key={field.id}
//                   field={field}
//                   onSelect={onSelectField}
//                   isSelected={selectedFieldId === field.id}
//                 />
//               ))}
//               {fields.length === 0 && (
//                 <div className="list-group-item text-muted text-center">
//                   No fields added yet. Click buttons above to add fields.
//                 </div>
//               )}
//             </div>
//           </SortableContext>
//         </DndContext>
//       </Card.Body>
//     </Card>
//   );
// }



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
  { type: 'text', label: '📝 Text', icon: 'T' },
  { type: 'email', label: '📧 Email', icon: 'E' },
  { type: 'number', label: '🔢 Number', icon: '#' },
  { type: 'date', label: '📅 Date', icon: 'D' },
  { type: 'checkbox', label: '☑️ Checkbox', icon: '✓' },
  { type: 'radio', label: '⭕ Radio Group', icon: '○' },
  { type: 'dropdown', label: '📋 Dropdown', icon: '▼' },
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

  // FIXED: Delete function
  const handleDelete = (e) => {
    e.stopPropagation(); // Stop click from bubbling
    e.preventDefault();  // Prevent default
    console.log('🗑️ DELETE CLICKED - Field ID:', field.id);
    dispatch(deleteField(field.id)); // Dispatch delete action
  };

  const handleSelect = () => {
    console.log('👆 Selecting field:', field.id);
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

  console.log('🔍 Current fields in Redux:', fields);

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
    console.log('➕ Adding field type:', type);
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