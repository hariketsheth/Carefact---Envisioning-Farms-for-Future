import './style.scss';

const Card = (props) => {
  return (
    <div className="card fade-up">
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
}

export default Card;