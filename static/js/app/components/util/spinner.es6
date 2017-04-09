import classNames from 'classnames';


const Spinner = ({ big, centered }) =>
    <div className={classNames("spinner", { big }, { centered })}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>;


export { Spinner };
