import './styles.scss';
const Square = ({ value, onClick, className }) => (
  <div className={className} onClick={onClick}>
    {value}
  </div>
);
export default Square;
