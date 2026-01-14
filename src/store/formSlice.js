import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  fields: [],
  formTitle: 'My Form',
  conditionalRules: [],
  savedForms: JSON.parse(localStorage.getItem('formBuilderForms')) || [],
  selectedFieldId: null, 
};

export const saveFormToStorage = createAsyncThunk(
  'form/saveToStorage',
  async (formData, { getState }) => {
    const state = getState().form;
    const forms = [...state.savedForms, { ...formData, id: uuidv4(), timestamp: new Date().toISOString() }];
    localStorage.setItem('formBuilderForms', JSON.stringify(forms));
    return forms;
  }
);

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addField: (state, action) => {
      const baseField = {
        id: uuidv4(),
        type: action.payload.type,
        label: '',
        placeholder: '',
        required: false,
        validation: {},
        options: action.payload.type === 'radio' || action.payload.type === 'dropdown' ? [] : undefined,
      };
      
      // Set defaults based on type
      switch(action.payload.type) {
        case 'text':
          baseField.label = 'Text Field';
          baseField.placeholder = '“Start typing or panic” ';
          break;
        case 'email':
          baseField.label = 'Email';
          baseField.placeholder = 'user@example.com';
          baseField.validation = { 
            pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
            errorMessage: 'Please enter a valid email'
          };
          break;
        case 'number':
          baseField.label = 'Number';
          baseField.validation = { min: 0, max: 100 };
          break;
        case 'date':
          baseField.label = 'Date';
          break;
        case 'checkbox':
          baseField.label = 'Checkbox';
          break;
        case 'radio':
          baseField.label = 'Radio Group';
          baseField.options = ['Option 1', 'Option 2'];
          break;
        case 'dropdown':
          baseField.label = 'Dropdown';
          baseField.options = ['Option 1', 'Option 2'];
          break;
      }
      
      state.fields.push(baseField);
      state.selectedFieldId = baseField.id; //Automatically select new field
    },
    
    updateField: (state, action) => {
      const { id, updates } = action.payload;
      const fieldIndex = state.fields.findIndex(f => f.id === id);
      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = { ...state.fields[fieldIndex], ...updates };
      }
    },
    
    
    
    deleteField: (state, action) => {
  const fieldId = action.payload;
  console.log('Redux: Deleting field', fieldId);
  
  // Remove the field
  state.fields = state.fields.filter(f => f.id !== fieldId);
  

  if (state.selectedFieldId === fieldId) {
    state.selectedFieldId = null;
  }
},
    reorderFields: (state, action) => {
      const { activeId, overId } = action.payload;
      const oldIndex = state.fields.findIndex(f => f.id === activeId);
      const newIndex = state.fields.findIndex(f => f.id === overId);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const [removed] = state.fields.splice(oldIndex, 1);
        state.fields.splice(newIndex, 0, removed);
      }
    },
    
    addConditionalRule: (state, action) => {
      state.conditionalRules.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    
    updateConditionalRule: (state, action) => {
      const { id, updates } = action.payload;
      const ruleIndex = state.conditionalRules.findIndex(r => r.id === id);
      if (ruleIndex !== -1) {
        state.conditionalRules[ruleIndex] = { ...state.conditionalRules[ruleIndex], ...updates };
      }
    },
    
    deleteConditionalRule: (state, action) => {
      state.conditionalRules = state.conditionalRules.filter(r => r.id !== action.payload);
    },
    
    loadForm: (state, action) => {
      const form = state.savedForms.find(f => f.id === action.payload);
      if (form) {
        state.fields = form.fields;
        state.formTitle = form.formTitle;
        state.conditionalRules = form.conditionalRules || [];
        state.selectedFieldId = form.fields.length > 0 ? form.fields[0].id : null;
      }
    },

   
deleteSavedForm: (state, action) => {
  const formId = action.payload;
  state.savedForms = state.savedForms.filter(form => form.id !== formId);
  
  // Update localStorage
  localStorage.setItem('formBuilderForms', JSON.stringify(state.savedForms));
},
    
    resetForm: (state) => {
      state.fields = [];
      state.conditionalRules = [];
      state.formTitle = 'My Form';
      state.selectedFieldId = null; 
    },
    
    setFormTitle: (state, action) => {
      state.formTitle = action.payload;
    },
    
    setSelectedField: (state, action) => { 
      state.selectedFieldId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(saveFormToStorage.fulfilled, (state, action) => {
      state.savedForms = action.payload;
    });
  },
});

export const {
  addField,
  updateField,
  deleteField,
  reorderFields,
  addConditionalRule,
  updateConditionalRule,
  deleteConditionalRule,
  loadForm,
  resetForm,
  setFormTitle,
  deleteSavedForm,
  setSelectedField, 
} = formSlice.actions;

export default formSlice.reducer;