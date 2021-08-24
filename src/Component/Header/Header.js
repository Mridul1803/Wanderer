import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useHistory } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const useStyles = makeStyles({
    grow: {
        flexGrow: 1,
    },
    toolbar:{
        // background: 'linear-gradient(90deg, #4b6cb7 0%, #182848 100%)',
        // background: 'linear-gradient(to right, #2F0743, #41295a)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        background: 'linear-gradient(to right, #42275a, #734b6d)'
    },
    logo : {
        width:'200px'
    },
    title:{
        color:'white',
    }
})

function Header(props) {
    const classes = useStyles();
    const {logout} = useContext(AuthContext);
    const history = useHistory();
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlesignout = async ()=>{
        await logout();
        history.push('/signin');
    }

    return (

        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar className={classes.toolbar} >
                    <Typography className={classes.title} variant="h4" noWrap>
                        WANDERER
                    </Typography>

                    {/* <img src='img1.jpg' alt='alt' className='logo' /> */}

                    <div className={classes.grow} />
                    <div >

                        <IconButton
                            edge="end"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Link to='/' style={ {color:'white'} } >
                                <HomeIcon />
                            </Link>
                        </IconButton>

                        {/* <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <Link to='/profile' style={ {color:'white'} } >
                                <AccountCircle />
                            </Link>
                        </IconButton> */}
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            >
                            <AccountCircle />
                        </IconButton>
                        <Menu id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}>
                                <MenuItem >
                                    <Link to="/profile" style={{color:"black" , textDecoration:"none"}}>Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={handlesignout} >Sign Out</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
        </div>

        // <React.Fragment>
        //     <CssBaseline />
        //     <ElevationScroll {...props}>
        //         <AppBar>
        //             <Toolbar>
        //                 <Typography variant="h6">Wanderer</Typography>
        //                 <div className={classes.sectionDesktop}>
        //                     <IconButton
        //                         edge="end"
        //                         aria-label="account of current user"
        //                         aria-controls={menuId}
        //                         aria-haspopup="true"
        //                         color="inherit"
        //                     >
        //                         <AccountCircle />
        //                     </IconButton>
        //                 </div>
        //             </Toolbar>
        //         </AppBar>
        //     </ElevationScroll>
        //     <Toolbar />
        // </React.Fragment>

    )
}

export default Header
