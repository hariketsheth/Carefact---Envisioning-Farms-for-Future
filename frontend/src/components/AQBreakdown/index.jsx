import "./style.scss";

const AQBreakdown = (props) => {
    return (
        <div class="air-quality">
            <h3 class="title">Air Quality Breakdown</h3> 
            <ul class="breakdown">
                <li><div>Air Quality Index</div><div>{props.data.AQI}</div></li>
                <li><div>Nitrogen Dioxide</div><div>{props.data.NO}</div></li>
                <li><div>Particulate Matter (2.5)</div><div>{props.data.PM25}</div></li>
                <li><div>Carbon Monoxide</div><div>{props.data.CO}</div></li>
                <li><div>Ozone</div><div>{props.data.OZONE}</div></li>
                <li><div>Sulfur Dioxide</div><div>{props.data.SO2}</div></li>
            </ul>
        </div>
    )
}

export default AQBreakdown;