import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import './TabPanel.module.css'

export const StyledTabs = withStyles({
    indicator: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: '#040E28',
        '& > span': {
            maxWidth: 55,
            width: '100%',
            backgroundColor: '#FFAB1D',
            position:'relative',
            bottom:'10px',
        },
    },
})((props) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

export const StyledTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: theme.typography.pxToRem(20),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1.3),
        color:'#ffffff',
        
        '&:focus': {
            opacity: 1,
            outline: "none",
        },
    },
}))((props) => <Tab disableRipple {...props} />);

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: theme.spacing(1),
        
    },
    abc: {
        background: '#0B65C1'
    }
}));

export const TabPanels = ({tabs, ...props}) => {
    const [value, setValue] = React.useState(props.tabIndex || 0);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <div className="d-flex flex-row justify-content-between" style={{background: "#0B65C1", borderRadius: "0px 0px 10px 10px", height: "60px"}}>
                <StyledTabs
                    style={{justifyContent: "center"}}
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    aria-label="styled tabs example"
                >
                    {
                        tabs.map((tab, index) => (
                            <StyledTab 
                            label={<h4 style={{"fontSize": "16px"}}><b>{tab.title}</b></h4>}/>
                        ))
                    }
                </StyledTabs>
                {tabs[value].rightTabContent}
            </div>
            {
                tabs[value].component
            }
        </div>
    );
};
