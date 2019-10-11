// tslint:disable-next-line:no-submodule-imports
import { fade } from '@material-ui/core/styles/colorManipulator';
import { createStyles } from '@material-ui/core';

export const headerSearchStyles = (theme: any) =>
  createStyles({
    root: {
      width: '100%'
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto'
      }
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit',
      width: '100%'
    },
    inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 350,
        // make the bar grow when it's focused
        '&:focus': {
          width: 450
        },
        // make the bar grow when it's focused
        '&:hover': {
          width: 450
        }
      }
    }
  });
