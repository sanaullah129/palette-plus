import { withStyles } from '@material-ui/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { blue, red } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MiniPalette from '../MiniPalette/MiniPalette';
import styles from './PaletteList.styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from "@mui/icons-material/Menu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDeleteDialog: false,
      deletingId: '',
      openResetDialog: false,
      menuAnchorEl: null
    };
  }

  goToPalette = id => {
    this.props.history.push(`/palette/${id}`);
  };
  openDialog = id => {
    this.setState({ openDeleteDialog: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ openDeleteDialog: false, deletingId: '' });
  };
  handleDelete = () => {
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
  };

  handleMenuOpen = (event) => {
    this.setState({ menuAnchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ menuAnchorEl: null });
  };

  // Toggle the reset confirmation dialog
  toggleResetDialog = () => {
    this.setState((prevState) => ({
      openResetDialog: !prevState.openResetDialog,
    }));
  };

  handleReset() {
    window.localStorage.removeItem("palettes");
    window.location.reload();
  }

  render() {
    const { palettes, classes } = this.props;
    const { openDeleteDialog, openResetDialog, menuAnchorEl } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.heading}>Palette Plus</h1>
            <IconButton
              aria-owns={menuAnchorEl ? "menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenuOpen}
              title="More Options"
              className={classes.menuIconDesign}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={this.handleMenuClose}
            >
              <MenuItem
                onClick={()=>{window.location.href = "/palette/new"}}
                title="Create a new Palette"
              >
                Create Palette
              </MenuItem>
              <MenuItem
                onClick={this.toggleResetDialog} // Open the reset dialog
                title="Delete all current palettes and retrieve the original 9 palettes"
              >
                Reset all Palettes
              </MenuItem>
            </Menu>
          </nav>
          {palettes.length > 0 ? (
            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition key={palette.id} classNames='fade' timeout={500}>
                  <MiniPalette
                    key={palette.id}
                    {...palette}
                    goToPalette={this.goToPalette}
                    openDialog={this.openDialog}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <Button
              variant='contained'
              color='primary'
              className={classes.addColor}
              onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          )}
        </div>

        <Dialog
          open={openDeleteDialog}
          aria-labelledby='delete-dialog-title'
          onClose={this.closeDialog}>
          <DialogTitle id='delete-dialog-title'>Delete This Palette?</DialogTitle>
          <List>
            <ListItem button onClick={this.handleDelete}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Delete' />
            </ListItem>
            <ListItem button onClick={this.closeDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary='Cancel' />
            </ListItem>
          </List>
        </Dialog>

        {/**Reset Dialogue */}
        <Dialog
          open={openResetDialog}
          aria-labelledby="reset-dialog-title"
          onClose={this.toggleResetDialog}
        >
          <DialogTitle className={classes.resetDialogTitle} id="reset-dialog-title">
            Are you sure you want to Reset all Palettes?
            <br/> <p>Note: You should be aware that resetting all palettes will permanently delete any custom palettes you've created. The application will revert to displaying the original nine preset palettes, and you won't be able to recover your previously deleted data.</p>
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleReset}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Reset" />
            </ListItem>
            <ListItem button onClick={this.toggleResetDialog}>
              <ListItemAvatar>
                <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
