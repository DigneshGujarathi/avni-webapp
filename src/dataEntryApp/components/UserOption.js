import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import SettingsIcon from "@material-ui/icons/Settings";
import VideoIcon from "@material-ui/icons/VideoLibrary";
import SyncIcon from "@material-ui/icons/Sync";
import LockIcon from "@material-ui/icons/Lock";
import LogoutIcon from "@material-ui/icons/Input";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Switch from "@material-ui/core/Switch";
import { LOCALES } from "../../common/constants";
import http from "common/utils/httpClient";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  root: {
    width: "22%",
    color: "blue",
    maxWidth: 360,
    position: "absolute",
    zIndex: "2",
    backgroundColor: theme.palette.background.paper,
    marginRight: "150px"
  },
  MuiSvgIcon: {
    root: {
      color: "blue"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  inputSearch: {
    borderBottom: "1px solid #dcdcdc",
    color: "#0e6eff",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "715px"
    }
  },
  headerMenu: {
    marginLeft: theme.spacing(3)
  },
  ListItemText: {
    color: "blue"
  }
}));

const UserOption = ({ orgConfig, defaultLanguage, getLanguages, userInfo }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState(defaultLanguage);

  const handleClick = () => {
    setOpen(!open);
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = lng => {
    console.log("changing laguage to " + lng);
    i18n.changeLanguage(lng);
  };

  const handleChange = event => {
    setValue(event.target.value);
    console.log("Radio button changed.." + event.target.value);

    console.log(userInfo);

    const userInfoJson = {
      username: userInfo.username,
      organisationName: userInfo.organisationName,
      organisationId: userInfo.organisationId,
      usernameSuffix: userInfo.usernameSuffix,
      settings: {
        ...userInfo.settings,
        locale: event.target.value
      },
      lastModifiedDateTime: userInfo.lastModifiedDateTime,
      roles: userInfo.roles
    };

    console.log("After...");
    console.log(userInfoJson);

    http.post("/me", userInfoJson).then(response => {
      if (response.status === 200) {
        // console.log("success");
        changeLanguage(userInfoJson.settings.locale);
      }
    });
  };

  const menuId = "primary-search-account-menu";

  return (
    <div style={{ float: "right", boxShadow: "3px 3px 5px #aaaaaa", marginRight: "300px" }}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
        style={{ boxShadow: "3px 3px 5px #aaaaaa" }}
      >
        <ListItem button onClick={handleClick} style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <ListItemIcon>
            <SettingsIcon style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Settings" style={{ color: "blue" }} onClick={getLanguages} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <FormControl
            component="fieldset"
            className={classes.formControl}
            style={{ fontSize: "12px", marginTop: "20px", marginLeft: "85px" }}
          >
            <FormLabel component="legend">Language</FormLabel>
            <RadioGroup aria-label="language" name="language" value={value} onChange={handleChange}>
              {orgConfig
                ? orgConfig.map((element, index) => (
                    <FormControlLabel
                      value={element}
                      control={<Radio />}
                      label={
                        getKeyByValue(LOCALES, element).charAt(0) +
                        getKeyByValue(LOCALES, element)
                          .slice(1)
                          .toLowerCase()
                      }
                    />
                  ))
                : ""}
            </RadioGroup>
            <FormLabel component="legend">Track location</FormLabel>
            <FormControlLabel control={<Switch checked={true} value="checkedA" />} label="On" />
          </FormControl>
        </Collapse>

        <ListItem button style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <ListItemIcon>
            <VideoIcon style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Video List" />
        </ListItem>

        <ListItem button style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <ListItemIcon>
            <SyncIcon style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Entity Sync Status" />
        </ListItem>

        <ListItem button style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <ListItemIcon>
            <LockIcon style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Change Password" />
        </ListItem>
        <ListItem button style={{ paddingTop: "5px", paddingBottom: "5px" }}>
          <ListItemIcon>
            <LogoutIcon style={{ color: "blue" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );
};

export default UserOption;
