import React, { useState } from 'react';
import '../App.css';
import { IconButton, Modal, Box, Tooltip } from '@mui/material'
import { Close, HelpOutline } from '@mui/icons-material';

export default function Tutorial() {
    const [open, setOpen] = useState(true);
    const handleToggle = () => {
        setOpen(!open);
    }

    return (
        <div className="Tutorial">
            <Tooltip title="Learn how it works">
                <IconButton size="large" onClick={handleToggle}>
                    <HelpOutline />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                aria-labelledby="tutorial-title"
                aria-describedby="tutorial-description"
            >
                <Box>
                    <IconButton size="large" onClick={handleToggle}>
                        <Close />
                    </IconButton>
                </Box>
            </Modal>
        </div>
    );
}
