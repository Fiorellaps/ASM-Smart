import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ListItem,
  List,
} from '@mui/material';

import { AttachFile, Close } from '@mui/icons-material';

const DownloadButtons = () => {
  // Add your download logic here

  return (
    <div>
      {/* Replace the onClick handlers with your actual download logic */}
      <Button onClick={() => console.log('Imagen Previa')}>
        Imagen Previa
      </Button>
      <Button onClick={() => console.log('Imagen Error')}>Imagen Error</Button>
      <Button onClick={() => console.log('Imagen Esperada')}>
        Imagen Esperada
      </Button>
      <Button onClick={() => console.log('Vídeo de Error')}>
        Vídeo de Error
      </Button>
      <Button onClick={() => console.log('Fichero Navegación')}>
        Fichero Navegación
      </Button>
    </div>
  );
};

const DownloadDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Descargar Capturas
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          <ListItem>Paso: 2 - Validar literal "BPI"</ListItem>
          <ListItem>Fecha: 10/11/2023</ListItem>
          <ListItem>Descripción: Elemento no encontrado</ListItem>
          <ListItem>IdWI: -</ListItem>
          <ListItem>URL: https://www.bancobpi.pt/bpigestaodeativo</ListItem>
        </List>
        <Button
          sx={{ backgroundColor: '#f3f3f3' }}
          onClick={() => console.log('Imagen Previa')}
        >
          Imagen Previa
        </Button>
        <Button
          sx={{ backgroundColor: '#f3f3f3' }}
          onClick={() => console.log('Imagen Error')}
        >
          Imagen Error
        </Button>
        <Button
          sx={{ backgroundColor: '#f3f3f3' }}
          onClick={() => console.log('Imagen Esperada')}
        >
          Imagen Esperada
        </Button>
        <Button
          sx={{ backgroundColor: '#f3f3f3' }}
          onClick={() => console.log('Vídeo de Error')}
        >
          Vídeo de Error
        </Button>
        <Button
          sx={{ backgroundColor: '#f3f3f3', margin: '2em' }}
          onClick={() => console.log('Fichero Navegación')}
        >
          Fichero Navegación
        </Button>
        <Button
          sx={{ backgroundColor: '#f3f3f3', margin: '2em' }}
          onClick={() => console.log('PDF')}
        >
          PDF
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export const DownloadAttachementDialog = () => {
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const handleOpenDownloadDialog = () => {
    setDownloadDialogOpen(true);
  };

  const handleCloseDownloadDialog = () => {
    setDownloadDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpenDownloadDialog}>
        <AttachFile />
      </Button>
      <DownloadDialog
        open={downloadDialogOpen}
        onClose={handleCloseDownloadDialog}
      />
    </div>
  );
};
