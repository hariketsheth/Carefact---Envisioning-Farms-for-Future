/* 
Props should contain: 
 - color 1 for gradient
 - color 2 for gradient
 - text to display
*/
const LocationInfo = (props) => {
    return (
        <div class="info-box">
            <h3 class="title">
                {props.title}
            </h3>
            <div class="info-content">
                {props.children}
            </div>
        </div>
    );
}

export default LocationInfo;