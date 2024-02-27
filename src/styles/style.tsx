import { CSSProperties } from 'react';

interface PopupStyleProps {
  [key: string]: string | number;
}

export const selectedContainerStyle = {
    left: 0,
    width: "75%",
    height: "40px",
    border: "5px solid #ccc",
    borderRadius: "10px",
    marginLeft: "140px",
    marginTop: "40px",
  };
  
  export const inputStyle = {
    marginLeft: "10px",
    border: "none",
    borderBottom: "1px solid #ffffff",
    borderRadius: "0",
    padding: "7px",
    fontSize: "15px",
    backgroundColor: "transparent",
    outline: "none",
  };
  

  export const popupStyle: CSSProperties & PopupStyleProps ={
    left: 0,
    scrollBarSize: 10,
    scroolBarHeight: 10,
    overflowY: "auto",
    maxHeight: "500px",
    scrollbarColor: "skyblue",
    marginTop: "20px",
    width: "75%",
    marginLeft: "140px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "10px",
  };
  
  export const imageStyle = {
    width: "75px",
    height: "75px",
    marginTop: "10px",
    marginRight: "10px",
    borderRadius: "5px",
  };
  