import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  Collapse,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { routes } from 'core/router';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import BallotIcon from '@mui/icons-material/Ballot';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

import * as classes from './side-list.styles';

interface Props {
  //onClick: () => void;
  onKeyDown: () => void;
  handleCollapse: () => void;
  openCollapse: boolean;
}

// TODO: Implement menu items
export const SideListComponent: React.FC<Props> = ({
  onKeyDown,
  handleCollapse,
  openCollapse,
}) => (
  <div
    className={classes.list}
    role="presentation"
    //onClick={onClick}
    onKeyDown={onKeyDown}
  >
    {/*<List>
      {['Calendario', 'Proyectos', 'Vacaciones'].map((text) => (
        <ListItem button key={text}>
          <ListItemText primary={text} />
        </ListItem>
      ))}
      </List>*/}
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Monitorización
        </ListSubheader>
      }
    >
      <Link
        to={routes.submoduleList}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>
    </List>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Gestión
        </ListSubheader>
      }
    >
      <Link
        to={routes.users}
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemIcon>
          <LocalOfferIcon />
        </ListItemIcon>
        <ListItemText primary="Tags" />
      </ListItemButton>
      <ListItemButton onClick={handleCollapse}>
        <ListItemIcon>
          <SmartToyIcon />
        </ListItemIcon>
        <ListItemText primary="Tours" />
        {openCollapse ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            to={routes.tests}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Tests" />
            </ListItemButton>
          </Link>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Entornos" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Listado
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <BallotIcon />
        </ListItemIcon>
        <ListItemText primary="Entornos" />
      </ListItemButton>
    </List>
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Alertas
        </ListSubheader>
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <ReportProblemIcon />
        </ListItemIcon>
        <ListItemText primary="Alerting" />
      </ListItemButton>
    </List>
  </div>
);
