import {useCallback, useEffect, useRef, useState} from "react";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop
} from "react-image-crop";
import Canvas from "./Canvas.js";
import "react-image-crop/dist/ReactCrop.css";
import ModalComp from "../ModalComp.jsx"; // Consider renaming this to something more specific like CropModal

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 77;

const InputImageComp = (props) => {
    const imgRef = useRef(null);
    const inputRef = useRef(null);
    const previewCanvasRef = useRef(null);

    // State untuk mengelola gambar yang di-upload dan gambar yang sudah di-crop
    const [imgSrc, setImgSrc] = useState("");
    const [croppedImage, setCroppedImage] = useState(null);
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    // Menggunakan useCallback untuk mengoptimalkan performa
    const onSelectFile = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            imageElement.src = reader.result;

            imageElement.addEventListener("load", (event) => {
                const {naturalWidth, naturalHeight} = event.currentTarget;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setError(`Image must be at least ${MIN_DIMENSION} x ${MIN_DIMENSION} pixels.`);
                    setImgSrc(""); // Clear the image source if dimensions are too small
                    return;
                }
                if (error) setError(""); // Clear any previous error
                setImgSrc(reader.result);
            });
        });
        reader.readAsDataURL(file);
    }, [error]); // Dependency on 'error' to clear it

    const onImageLoad = useCallback((e) => {
        const {width, height} = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const initialCrop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(initialCrop, width, height);
        setCrop(centeredCrop);
    }, []);

    // Menggunakan useCallback untuk menghindari re-render yang tidak perlu pada modal
    const handleModalClose = useCallback(() => {
        setImgSrc(""); // Menutup modal dengan mengosongkan imgSrc
        if (inputRef.current) {
            inputRef.current.value = null; // Reset input file
        }
    }, []);

    const handleCropImage = useCallback(() => {
        if (!imgRef.current || !previewCanvasRef.current || !crop) {
            return;
        }
        Canvas(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        const dataUrl = previewCanvasRef.current.toDataURL('image/jpeg', 0.7);
        props.handleInputOnChange(dataUrl);
        setCroppedImage(dataUrl);
        handleModalClose();
    }, [crop, props.handleInputOnChange, handleModalClose]);

    useEffect(() => {
        if (props.error) {
            setError(props.error)
        }
    }, [props.error]);

    return (
        <div className={'max-width-500'}>
            <label htmlFor={props.name} style={{display: 'block'}}>{props.name}</label>

            {/* Tampilkan gambar yang sudah di-crop atau gambar lama */}
            {(croppedImage || props.oldImage) &&
                <img className={'picture-default rounded'}
                     src={croppedImage || props.oldImage}
                     alt="Preview"/>}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                name={props.name}
                id={props.name}
            />

            {error && <p className="text-danger">{error}</p>}

            {/* Modal untuk crop gambar */}
            {imgSrc && (
                <ModalComp
                    title='Crop Image'
                    content={
                        <>
                            {props.oldImage &&
                                <div className="card-wrapper replace-shadow-with-border">
                                    <h3 className="text-center">Old Image</h3>
                                    <img className={'object-fit-cover'}
                                         style={{maxWidth: 600, width: '100%'}}
                                         src={props.oldImage}
                                         alt="Old"/>
                                </div>
                            }
                            <div className="card-wrapper replace-shadow-with-border">
                                <h3 className="text-center">New Image</h3>
                                <ReactCrop
                                    crop={crop}
                                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                                    circularCrop
                                    keepSelection
                                    aspect={ASPECT_RATIO}
                                    minWidth={MIN_DIMENSION}
                                >
                                    <img
                                        style={{maxWidth: 600, width: '100%'}}
                                        ref={imgRef}
                                        src={imgSrc}
                                        alt="Upload"
                                        onLoad={onImageLoad}
                                    />
                                </ReactCrop>
                            </div>
                            <button className="button bg-primary" onClick={handleCropImage}>
                                Crop Image
                            </button>
                        </>
                    }
                    handleClose={handleModalClose}
                />
            )}

            {/* Canvas tersembunyi untuk proses cropping */}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    style={{
                        display: "none",
                        // You can remove these styles if they are not used for layout
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 212,
                        height: 212,
                    }}
                />
            )}
        </div>
    );
};

export default InputImageComp;