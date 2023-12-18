import { css } from '@emotion/css';
import { theme } from 'core/theme';

interface Props {
  isEditMode: boolean;
}

const getDynamicAreaNames = (props: Props) => {
  return props.isEditMode ? `'id username'` : `'id password' 'username .'`;
};

export const form = (props: Props) => css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'id'
    ${props.isEditMode ? '' : `'password'`}
    'username'
    'email'
    'active'
    'commands'
    'commands';
  grid-row-gap: ${theme.spacing(2)};
  grid-column-gap: ${theme.spacing(3)};

  ${theme.breakpoints.up('md')} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      ${getDynamicAreaNames(props)}
      'email .'
      'active .'
      'commands commands';
  }
`;

export const id = css`
  grid-area: id;
`;

export const password = css`
  grid-area: password;
`;

export const username = css`
  grid-area: username;
`;

export const email = css`
  grid-area: email;
`;

export const active = css`
  grid-area: active;
`;

export const commands = css`
  grid-area: commands;
`;
