import "../styles/DropdownStyle.css";
function Dropdown(){
    return(
        <div className ="dropdown">
            <div className="dropdown-btn">General Information</div>
            <div className="dropdown-content">
            <div className="dropdown-item">
            React
            </div>
            <div className="dropdown-item">
            Vue
            </div>
        </div>
    </div>
    )
}

export default Dropdown