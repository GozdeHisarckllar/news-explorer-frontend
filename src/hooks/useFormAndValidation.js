import { useState, useCallback } from 'react';

function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
   
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: e.target.validationMessage});
    setIsFormValid(e.target.closest('form').checkValidity());
    if (e.target.closest('form').name === 'register' || e.target.closest('form').name === 'login')
    e.target.closest('form').querySelector('.form__input-error_type_submit').classList.remove('form__input-error_visible');
  };// or position relative to all second input -err // or margin increase heights

  const resetFormValidation = useCallback((newValues={}, newErrors={}, newIsValid=false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsFormValid(newIsValid);
  }, [setValues, setErrors, setIsFormValid]);

  return { values, errors, isFormValid, handleChange, resetFormValidation, setValues, setIsFormValid };
}

export default useFormAndValidation;