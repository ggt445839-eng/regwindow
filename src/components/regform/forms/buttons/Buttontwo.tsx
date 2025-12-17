import Tosend from "./Tosend.tsx";
import Cancellation from "./Cancellation.tsx";

type ButtonTwoProps = {
    onCancel: () => void;
    onSubmit: () => void;
};

const ButtonTwo = ({ onCancel, onSubmit }: ButtonTwoProps) => {
    return (
        <div className="buttons">
            <Cancellation onCancel={onCancel} />
            <Tosend onSubmit={onSubmit} />
        </div>
    );
};

export default ButtonTwo;
