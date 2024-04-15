import bg from '../../assets/sun-tornado.jpg';
import sizes from '../../helpers/sizes';
export default {
  // React TransitionGroup custom styles
  '@global': {
    '.fade-exit': {
      opacity: 1
    },
    '.fade-exit-active': {
      opacity: 0,
      transition: 'opacity 500ms ease-out'
    }
  },

  root: {
    height: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    /* background by SVGBackgrounds.com */
    backgroundImage: `url(${bg})`,
    overflowY: 'scroll',
  },
  container: {
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexWrap: 'wrap',
    [sizes.down('xl')]: {
      width: '80%'
    },
    [sizes.down('xs')]: {
      width: '75%'
    }
  },
  nav: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& a': {
      color: 'white'
    },
    marginBottom: '2rem',
    color: 'white',
    [sizes.down('xs')]: {
      flexDirection: 'column'
    }
  },
  heading: {
    fontSize: '3rem'
  },
  palettes: {
    boxSizing: 'border-box',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 30%)',
    gridGap: '5%',
    [sizes.down('md')]: {
      gridTemplateColumns: 'repeat(2, 47.5%)'
    },
    [sizes.down('xs')]: {
      gridTemplateColumns: 'repeat(1, 100%)',
      gridGap: '1.4rem'
    }
  },
  addColor: {
    width: '100%',
    padding: '1rem !important',
    marginTop: '1rem !important',
    fontSize: '2rem !important',
    backgroundColor: '#9c27b0 !important'
  },
  dialogTitle:{
    "& h2":{
      fontSize: "20px"
    }
  },
  resetDialogTitle:{
    fontSize: "18px",
    lineHeight: "normal",
    "& p":{
      fontSize: "15px",
      lineHeight: "normal",
      textAlign: "justify",
      textDecoration: "underline",
      color: "red"
    }
  },
};
