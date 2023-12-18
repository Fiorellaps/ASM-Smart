import React from 'react';
import { Formik, Form } from 'formik';
import { TextFieldComponent, CheckboxComponent } from 'common/components';
import produce from 'immer';
import { CommandFooterComponent } from '../../../common-app/command-footer';
import * as classes from './data.styles';
import { cx } from '@emotion/css';
import { UserEntity } from '../user.vm';
import { formValidation, validationSchema } from './data.validations';
import { Validators } from '@lemoncode/fonk';

interface Props {
  user: UserEntity;
  className?: string;
  isEditMode: boolean;
  onSave: (user: UserEntity) => void;
  onCancel: () => void;
}

export const DataComponent: React.FunctionComponent<Props> = ({
  user,
  className,
  onSave,
  isEditMode,
  onCancel,
}) => {
  React.useEffect(() => {
    const newValidationSchema = produce(validationSchema, (darft) => {
      darft.field.password = isEditMode ? [] : [Validators.required];
    });
    formValidation.updateValidationSchema(newValidationSchema);
  }, [isEditMode]);

  return (
    <Formik
      initialValues={user}
      enableReinitialize={true}
      onSubmit={onSave}
      validate={formValidation.validateForm}
    >
      {() => (
        <Form className={cx(classes.form({ isEditMode }), className)}>
          {!isEditMode && (
            <TextFieldComponent
              label="Clave Temporal"
              name="password"
              className={classes.password}
            />
          )}
          <TextFieldComponent
            label="Nombre"
            name="name"
            className={classes.username}
          />
          <TextFieldComponent
            label="Email"
            name="email"
            className={classes.email}
          />
          <CheckboxComponent
            name="active"
            label="Activo"
            color="primary"
            className={classes.active}
          />

          <CommandFooterComponent
            onCancel={onCancel}
            className={classes.commands}
          />
        </Form>
      )}
    </Formik>
  );
};
