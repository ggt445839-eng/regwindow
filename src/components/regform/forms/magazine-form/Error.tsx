interface ErrorProps {
    message: string;
}

export default function Error({ message }: ErrorProps) {
    return (
        <p className="error-text text-center mt-12">
            {message}
        </p>
    );
}