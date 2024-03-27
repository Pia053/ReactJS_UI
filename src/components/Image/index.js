import { forwardRef, useState } from 'react';
import images from '../../../src/assets/images';
import styles from './Images.module.scss';

const Image = forwardRef(({ src, alt, fallback: customFallBack = images.noImage, className, props }, ref) => {
    const [failBack, setFailBack] = useState('');

    const handleErr = () => {
        setFailBack(customFallBack);
    };

    return (
        <img
            ref={ref}
            className={(styles.wrapper, className)}
            src={failBack || src}
            alt={alt}
            {...props}
            onError={handleErr}
        ></img>
    );
});

export default Image;
