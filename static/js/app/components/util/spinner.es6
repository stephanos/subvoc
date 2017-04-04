import classNames from 'classnames';


const Spinner = ({ big }) =>
    <div className={classNames("spinner", { big })}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>;


export { Spinner };
